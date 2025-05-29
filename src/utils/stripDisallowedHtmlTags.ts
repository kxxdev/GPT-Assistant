export function stripDisallowedHtmlTags(input: string): string {
  // Разрешённые теги и атрибуты
  const allowedTagPatterns = [
    // Простые парные теги
    /<\/?(b|strong|i|em|u|ins|s|strike|del|code|pre|tg-spoiler)>/g,
    // <span class="tg-spoiler">
    /<span class="tg-spoiler">|<\/span>/g,
    // <a href="...">...</a>
    /<a href="[^"]+">|<\/a>/g,
    // <tg-emoji emoji-id="...">...</tg-emoji>
    /<tg-emoji emoji-id="[\d]+">|<\/tg-emoji>/g,
    // <code class="language-...">
    /<code class="language-[a-zA-Z0-9_-]+">|<\/code>/g,
    // <blockquote> и <blockquote expandable>
    /<blockquote(?: expandable)?>|<\/blockquote>/g,
  ];

  // Объединённое регулярное выражение для допустимых тегов
  const allowedCombined = new RegExp(
    allowedTagPatterns.map((p) => `(${p.source})`).join('|'),
    'g'
  );

  // Заменяем все теги, которые НЕ разрешены
  return input.replace(/<\/?[^>]+>/g, (match) => {
    return match.match(allowedCombined) ? match : '';
  });
}
