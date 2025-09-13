const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const path = require('path');

// This array contains all the URLs for your public pages.
const links = [
  // --- Core Pages ---
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/about', changefreq: 'monthly', priority: 0.8 },
  { url: '/contact', changefreq: 'monthly', priority: 0.7 },
  { url: '/career', changefreq: 'monthly', priority: 0.7 },
  { url: '/JobPosition', changefreq: 'monthly', priority: 0.6 },
  { url: '/compaigns', changefreq: 'monthly', priority: 0.7 },

  // --- Media Main Pages ---
  { url: '/media', changefreq: 'weekly', priority: 0.9 },
  { url: '/media/ATL', changefreq: 'weekly', priority: 0.8 },
  { url: '/media/BTL', changefreq: 'weekly', priority: 0.8 },
  { url: '/media/TTL', changefreq: 'weekly', priority: 0.8 },

  // --- ATL Media Services ---
  { url: '/media/ATL/unipoles', changefreq: 'monthly', priority: 0.7 },
  { url: '/media/ATL/bus-branding', changefreq: 'monthly', priority: 0.7 },
  { url: '/media/ATL/bus-stands', changefreq: 'monthly', priority: 0.7 },
  { url: '/media/ATL/auto-branding', changefreq: 'monthly', priority: 0.7 },
  { url: '/media/ATL/city-gantries', changefreq: 'monthly', priority: 0.7 },
  { url: '/media/ATL/kiosks', changefreq: 'monthly', priority: 0.7 },
  { url: '/media/ATL/mall-ads', changefreq: 'monthly', priority: 0.7 },
  { url: '/media/ATL/van-activity', changefreq: 'monthly', priority: 0.7 },
  { url: '/media/ATL/petrol-pumps', changefreq: 'monthly', priority: 0.7 },
  { url: '/media/ATL/wall-wraps', changefreq: 'monthly', priority: 0.7 },
  { url: '/media/ATL/wall-paintings', changefreq: 'monthly', priority: 0.7 },
  { url: '/media/ATL/railway-ads', changefreq: 'monthly', priority: 0.7 },
  { url: '/media/ATL/metro-ads', changefreq: 'monthly', priority: 0.7 },
  { url: '/media/ATL/airport-ads', changefreq: 'monthly', priority: 0.7 },
  { url: '/media/ATL/newspaper-ads', changefreq: 'monthly', priority: 0.7 },
  { url: '/media/ATL/tv-ads', changefreq: 'monthly', priority: 0.7 },
  { url: '/media/ATL/radio-ads', changefreq: 'monthly', priority: 0.7 },

  // --- BTL Media Services ---
  { url: '/media/BTL/cinema-advertising', changefreq: 'monthly', priority: 0.7 },
  { url: '/media/BTL/dhaba-advertising', changefreq: 'monthly', priority: 0.7 },
  { url: '/media/BTL/event-branding', changefreq: 'monthly', priority: 0.7 },
  { url: '/media/BTL/look-walker', changefreq: 'monthly', priority: 0.7 },
  { url: '/media/BTL/pole-sunpacks', changefreq: 'monthly', priority: 0.7 },
  { url: '/media/BTL/retail-branding', changefreq: 'monthly', priority: 0.7 },
  { url: '/media/BTL/seminars-branding', changefreq: 'monthly', priority: 0.7 },
  { url: '/media/BTL/traffic-barricades', changefreq: 'monthly', priority: 0.7 },

  // --- TTL Media Services ---
  { url: '/media/TTL/brand-collaboration', changefreq: 'monthly', priority: 0.7 },
  { url: '/media/TTL/email-whatsapp-marketing', changefreq: 'monthly', priority: 0.7 },
  { url: '/media/TTL/mall-inside-led', changefreq: 'monthly', priority: 0.7 },
  { url: '/media/TTL/mc-led-hoardings', changefreq: 'monthly', priority: 0.7 },
  { url: '/media/TTL/social-media-ads', changefreq: 'monthly', priority: 0.7 },
  { url: '/media/TTL/google-ads', changefreq: 'monthly', priority: 0.7 },
  
  // --- Resources ---
  { url: '/resources/blogs', changefreq: 'weekly', priority: 0.8 },
  { url: '/resources/products', changefreq: 'monthly', priority: 0.7 },

  // --- IMPORTANT: Manually add your specific blog post URLs here ---
  // Example:
  // { url: '/resources/blogs/benefits-of-ooh-advertising', changefreq: 'yearly', priority: 0.6 },
];

// --- Script Logic (No need to change) ---
const hostname = 'https://www.starpublicity.co.in'; // Replace with your actual domain
const dest = path.resolve('./client/public', 'sitemap.xml');
const sitemapStream = new SitemapStream({ hostname });
const writeStream = createWriteStream(dest);

sitemapStream.pipe(writeStream);
links.forEach(link => sitemapStream.write(link));
sitemapStream.end();

streamToPromise(sitemapStream).then(() => {
  console.log('✅ Sitemap has been generated in client/public/sitemap.xml!');
}).catch(console.error);

