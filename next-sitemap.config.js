// next-sitemap.config.js

/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: "https://carrentas.com", // your actual domain
    generateRobotsTxt: true,          // ✅ auto create robots.txt
    changefreq: "daily",
    priority: 0.7,
    sitemapSize: 5000,
    exclude: ["/adminpage", "/login", "/carlist", ], // exclude private/admin pages
    robotsTxtOptions: {
      policies: [
        { userAgent: "*", allow: "/" },
      ],
    },
  };
  