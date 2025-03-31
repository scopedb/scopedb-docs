import type {MarkdownHeading} from "astro";
import type {TreeTocNode} from "../interface";

export function buildTocTree(flatToc:MarkdownHeading[]) {
    const root = {
      depth: 0,
      text: '',
      slug: '',
      children: [] as TreeTocNode[],
    };
    const stack:TreeTocNode[] = [root];
    
    for (const item of flatToc) {
      const newNode: TreeTocNode = {
        ...item,
        children: [],
      };
  
      while (stack.length > 1 && stack[stack.length - 1].depth >= item.depth) {
        stack.pop();
      }
  
      const currentParent = stack[stack.length - 1];
      currentParent.children.push(newNode);
  
      stack.push(newNode);
    }
  
    return root.children;
}