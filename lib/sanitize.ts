import sanitizeHtml from "sanitize-html";

const DEFAULT_ALLOWED_TAGS = [
  "p",
  "br",
  "strong",
  "em",
  "u",
  "s",
  "ul",
  "ol",
  "li",
  "a",
  "h2",
  "h3",
  "h4",
  "blockquote",
  "span",
];

const DEFAULT_ALLOWED_ATTRIBUTES: sanitizeHtml.IOptions["allowedAttributes"] = {
  a: ["href", "title", "target", "rel"],
  span: ["class"],
};

export interface SanitizeOptions {
  allowedTags?: string[];
  allowedAttributes?: sanitizeHtml.IOptions["allowedAttributes"];
}

export function sanitizeRichText(
  html: string,
  options: SanitizeOptions = {},
): string {
  return sanitizeHtml(html, {
    allowedTags: options.allowedTags ?? DEFAULT_ALLOWED_TAGS,
    allowedAttributes: options.allowedAttributes ?? DEFAULT_ALLOWED_ATTRIBUTES,
    allowedSchemes: ["http", "https", "mailto", "tel"],
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", {
        rel: "noopener noreferrer",
        target: "_blank",
      }),
    },
  });
}

export function sanitizePlainText(text: string): string {
  return sanitizeHtml(text, {
    allowedTags: [],
    allowedAttributes: {},
  }).trim();
}
