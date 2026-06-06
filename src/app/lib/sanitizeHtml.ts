/**
 * sanitizeHtml — lightweight allow-list HTML sanitizer.
 *
 * Strips all tags except a safe subset, and removes all event-handler
 * attributes and javascript: URLs. Used to sanitize CMS content before
 * rendering via dangerouslySetInnerHTML.
 *
 * Allowed tags: <br>, <b>, <strong>, <em>, <i>, <ul>, <ol>, <li>, <p>, <span>
 *
 * Does NOT support a full HTML tree — this is intentionally minimal.
 * For rich text editing, use a dedicated DOMPurify library on the client.
 */
export function sanitizeHtml(input: string): string {
  if (!input || typeof input !== 'string') return '';

  // 1. Strip dangerous tags entirely (including their content)
  const stripTags = /<(script|style|iframe|object|embed|form|input|button|link|meta|base|svg|math)[^>]*>[\s\S]*?<\/\1>/gi;
  let clean = input.replace(stripTags, '');

  // 2. Strip self-closing dangerous tags
  clean = clean.replace(/<(script|style|iframe|object|embed|form|input|button|link|meta|base|svg|math)[^>]*\/?>/gi, '');

  // 3. Remove all event handler attributes (onclick, onerror, onload, etc.)
  clean = clean.replace(/\s+on\w+\s*=\s*["'][^"']*["']/gi, '');
  clean = clean.replace(/\s+on\w+\s*=\s*[^\s>]*/gi, '');

  // 4. Remove javascript: and data: URI schemes in any attribute
  clean = clean.replace(/((href|src|action|formaction)\s*=\s*["']?\s*)(javascript:|data:)[^"'\s>]*/gi, '$1#');

  // 5. Strip any remaining tags that are NOT in the safe allow-list
  const allowedTagsPattern = /^\/?(br|b|strong|em|i|ul|ol|li|p|span)(\s[^>]*)?$/i;
  clean = clean.replace(/<([^>]+)>/g, (match, inner) => {
    return allowedTagsPattern.test(inner.trim()) ? match : '';
  });

  return clean;
}
