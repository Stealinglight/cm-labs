/**
 * Generates sitemap.xml with the current date as lastmod
 * Run this as part of the build process
 */

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://cm-sec.ai';
const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;

const outputPath = path.join(__dirname, '../public/sitemap.xml');
fs.writeFileSync(outputPath, sitemap);
console.log(`✓ Generated sitemap.xml with lastmod: ${today}`);
