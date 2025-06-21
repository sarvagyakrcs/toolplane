/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://toolplane.xyz',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/'],
      },
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        disallow: '/',
      },
      {
        userAgent: 'Google-Extended',
        disallow: '/',
      },
    ],
    additionalSitemaps: [
      'https://toolplane.xyz/sitemap.xml',
    ],
  },
  exclude: ['/api/*', '/admin/*', '/_next/*', '/404', '/500'],
  generateIndexSitemap: false,
  transform: async (config, path) => {
    // Custom priority for different page types
    let priority = 0.7;
    let changefreq = 'weekly';

    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (path === '/blog') {
      priority = 0.9;
      changefreq = 'daily';
    } else if (path.startsWith('/blog/')) {
      priority = 0.8;
      changefreq = 'monthly';
    } else if (path.includes('scraper') || path.includes('generator') || path.includes('converter')) {
      priority = 0.8;
      changefreq = 'weekly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs || [],
    };
  },
  additionalPaths: async (config) => {
    const fs = require('fs');
    const path = require('path');
    
    const blogPosts = [];
    
    try {
      const blogPath = path.join(process.cwd(), 'content/blog');
      if (fs.existsSync(blogPath)) {
        const files = fs.readdirSync(blogPath);
        const mdxFiles = files.filter(file => file.endsWith('.mdx'));
        
        for (const file of mdxFiles) {
          const slug = file.replace(/\.mdx$/, '');
          blogPosts.push({
            loc: `/blog/${slug}`,
            changefreq: 'monthly',
            priority: 0.8,
            lastmod: new Date().toISOString(),
          });
        }
      }
    } catch (error) {
      console.warn('Could not generate blog sitemap entries:', error);
    }
    
    return blogPosts;
  },
}; 