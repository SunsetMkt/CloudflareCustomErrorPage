# CloudflareCustomErrorPage

Lightweight custom error page written for Cloudflare.

## How To Use

Build on Cloudflare Pages with `npm run build`.

## License

MIT

## Why no modern frameworks?

Cloudflare custom error page will embed all JavaScript and CSS (even more assets including fonts, images, etcs) in the HTML file to create a single file page. This will easily break many modern frameworks. The most modern framework we could use in this case is SSG (Static Site Generator), which must create vanilla HTML files.
