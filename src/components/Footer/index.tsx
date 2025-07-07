import { SiDiscord, SiGithub, SiGmail, SiX } from "react-icons/si";

export default function Footer() {
  const linkClass = "!text-[var(--text-tertiary)] !no-underline transition-all duration-200 hover:!text-[var(--text-primary)] text-[14px] font-normal";
  const iconClass = "social-link flex items-center justify-center w-10 h-10 rounded-lg !text-[var(--text-tertiary)] !no-underline transition-all duration-200 hover:!text-[var(--text-primary)] group";
  const iconSize = 20

  return (
    <footer className="w-full mt-16">
      <div className="w-full border-t border-[rgba(0,0,0,0.03)] mb-[12px]"></div>

      <div
        className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6"
      >
        <div className="flex flex-wrap gap-x-8 gap-y-4">
          <a
            href="https://www.scopedb.io"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            Visit ScopeDB
          </a>

          <a
            href="https://discord.gg/AynEZfqFvM"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            Community
          </a>

          <a href="mailto:contact@scopedb.io" className={linkClass}>Feedback</a>

          <a
            href="https://www.scopedb.io/blog"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            Blog
          </a>
        </div>

        <div
          className="flex justify-start sm:justify-end items-center gap-[4px] flex-wrap"
        >
          <a
            href="https://twitter.com/scopedbio"
            target="_blank"
            rel="noopener noreferrer"
            className={iconClass}
            aria-label="Follow us on X (Twitter)"
          >
            <SiX size={iconSize} />
          </a>

          <a
            href="https://github.com/scopedb"
            target="_blank"
            rel="noopener noreferrer"
            className={iconClass}
            aria-label="Star us on GitHub"
          >
            <SiGithub size={iconSize} />
          </a>

          <a
            href="https://discord.gg/AynEZfqFvM"
            target="_blank"
            rel="noopener noreferrer"
            className={iconClass}
            aria-label="Join our Discord"
          >
            <SiDiscord size={iconSize} />
          </a>

          <a
            href="mailto:contact@scopedb.com"
            className={iconClass}
            aria-label="Contact us via email"
          >
            <SiGmail size={iconSize} />
          </a>
        </div>
      </div>

      <div className="w-full border-t border-[rgba(0,0,0,0.03)] my-[12px]"></div>
      <div className="!text-[var(--text-tertiary)] text-[14px] leading-[14px] pt-[12px]">
        © 2025 ScopeDB. All rights reserved.
      </div>
    </footer>
  );
}
