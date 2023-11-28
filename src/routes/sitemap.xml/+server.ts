export async function GET() {
	return new Response(
		`<?xml version="1.0" encoding="UTF-8" ?>		
        <urlset			
            xmlns:xhtml="https://www.w3.org/1999/xhtml"
            xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"			
            xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"			
            xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"			
            xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"			
            xmlns:video="https://www.google.com/schemas/sitemap-video/1.1">			
            
            <url>
                <loc>https://trendin.dev/</loc>
            </url>

            <url>
                <loc>https://trendin.dev/tag/github</loc>
            </url>

            <url>
                <loc>https://trendin.dev/tag/product-hunt</loc>
            </url>

            <url>
                <loc>https://trendin.dev/tag/hacker-news</loc>
            </url>

            <url>
                <loc>https://trendin.dev/tag/indie-hackers</loc>
            </url>

            <url>
                <loc>https://trendin.dev/tag/vscode</loc>
            </url>
            
            </urlset>`.trim(),
		{ headers: { 'Content-Type': 'application/xml' } }
	);
}
