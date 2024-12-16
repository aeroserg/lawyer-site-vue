interface RichTextNode {
  type?: string;
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  level?: number;
  children?: RichTextNode[];
  format?: string;
}

/**
 * Renders a single rich text node to HTML.
 */
function renderTextNode(node: RichTextNode): string {
  let text = node.text || "";
  if (node.bold) text = `<strong>${text}</strong>`;
  if (node.italic) text = `<em>${text}</em>`;
  if (node.underline) text = `<u>${text}</u>`;
  return text;
}

/**
 * Determines the HTML tag for a given node type.
 */
function getTagForNode(node: RichTextNode): string {
  switch (node.type) {
    case "heading":
      return node.level ? `h${node.level}` : "h2";
    case "paragraph":
      return "p";
    case "text":
      return "span";
    case "list":
      return node.format === "ordered" ? "ol" : "ul"; // Detects ordered/unordered lists
    case "list-item":
      return "li";
    default:
      return "div"; // Fallback for unknown types
  }
}

/**
 * Recursively renders rich text nodes to HTML.
 */
export function renderRichText(nodes: RichTextNode[] = []): string {
  const spacerHeight = window.innerWidth <= 997 ? "1rem" : "3rem";

  return nodes
    .map((node) => {
      // Check for empty paragraph node and return a spacer
      if (node.type === "paragraph" && (!node.children || node.children.every((child) => !child.text?.trim()))) {
        return `<div style="height: ${spacerHeight};"></div>`; // Spacer with dynamic height
      }

      const tag = getTagForNode(node);

      if (node.type === "text") {
        return renderTextNode(node);
      }

      const childrenHtml = node.children ? renderRichText(node.children) : "";
      return `<${tag}>${childrenHtml}</${tag}>`;
    })
    .join("");
}