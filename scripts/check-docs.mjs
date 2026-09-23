import { existsSync, readdirSync, readFileSync } from "node:fs";
import { extname, join, relative, sep } from "node:path";
import YAML from "yaml";

const contentRoot = "src/content";
const sidebarSource = readFileSync("src/sidebars.ts", "utf8");
const errors = [];

function contentFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? contentFiles(path) : extname(path) === ".mdx" ? [path] : [];
  });
}

function canonicalPath(file) {
  return `/${relative(contentRoot, file).split(sep).join("/").replace(/\.mdx$/, "")}`
    .replace(/\/index$/, "");
}

function normalizedPath(link) {
  const path = link.split(/[?#]/, 1)[0].replace(/\/$/, "");
  return path || "/";
}

const files = contentFiles(contentRoot);
const pagePaths = new Set(files.map(canonicalPath));
const sidebarDefinitions = sidebarSource.split("export const categories", 1)[0];
const sidebarPaths = [...sidebarDefinitions.matchAll(/\blink:\s*["'](\/[^"']+)["']/g)]
  .map((match) => normalizedPath(match[1]));
const sidebarSet = new Set(sidebarPaths);

for (const path of pagePaths) {
  if (!sidebarSet.has(path)) errors.push(`Page missing from sidebar: ${path}`);
}
for (const path of sidebarPaths) {
  if (!pagePaths.has(path)) errors.push(`Sidebar link without page: ${path}`);
}
if (sidebarSet.size !== sidebarPaths.length) {
  errors.push("Sidebar contains duplicate links");
}

for (const file of files) {
  const source = readFileSync(file, "utf8");
  const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!frontmatter) {
    errors.push(`Missing frontmatter: ${file}`);
  } else {
    const document = YAML.parseDocument(frontmatter[1]);
    for (const error of document.errors) {
      errors.push(`Invalid frontmatter in ${file}: ${error.message}`);
    }
    if (!document.errors.length && !document.get("title")) {
      errors.push(`Missing frontmatter title: ${file}`);
    }
  }

  const markdownLinks = [...source.matchAll(/(?<!!)\[[^\]]+\]\((\/[^)\s]+)\)/g)]
    .map((match) => match[1]);
  const relatedLinks = [...source.matchAll(/^\s+url:\s*(\/\S+)/gm)]
    .map((match) => match[1]);
  for (const link of [...markdownLinks, ...relatedLinks]) {
    const path = normalizedPath(link);
    if (path !== "/" && !pagePaths.has(path) && !existsSync(join("public", path.slice(1)))) {
      errors.push(`Broken internal link in ${file}: ${link}`);
    }
  }
}

const llmsSource = readFileSync("public/llms.txt", "utf8");
const llmsLinks = [...llmsSource.matchAll(/^\s*- \[[^\]]+\]\(([^)]+)\)/gm)]
  .map((match) => match[1]);

for (const link of llmsLinks) {
  let url;
  try {
    url = new URL(link);
  } catch {
    errors.push(`Invalid llms.txt URL: ${link}`);
    continue;
  }
  if (url.origin === "https://docs.scopedb.io" &&
      url.pathname !== "/sitemap.xml" &&
      !pagePaths.has(normalizedPath(url.pathname))) {
    errors.push(`Broken llms.txt link: ${link}`);
  }
}

if (llmsLinks.length === 0) {
  errors.push("llms.txt has no documentation links");
}

if (errors.length > 0) {
  for (const error of errors) console.error(error);
  process.exitCode = 1;
} else {
  console.log(`Checked ${files.length} pages, ${sidebarPaths.length} sidebar links, internal links, and ${llmsLinks.length} llms.txt links.`);
}
