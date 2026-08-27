export function normalizeProfileUrl(url: string): string {
  const parsed = new URL(url.trim());

  parsed.protocol = "https:";
  parsed.hostname = parsed.hostname.toLowerCase();

  // Remove query parameters and fragments.
  parsed.search = "";
  parsed.hash = "";

  // Remove trailing slash.
  parsed.pathname = parsed.pathname.replace(/\/+$/, "");

  return parsed.toString();
}