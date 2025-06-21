import RSS from 'rss';
import { getAllBlogPosts, generateBlogPostUrl } from './blog';

export function generateRSSFeed(): string {
  const posts = getAllBlogPosts();
  
  const feed = new RSS({
    title: 'Toolplane Blog - Developer Tools & Web Scraping Guides',
    description: 'Expert guides on web scraping, API development, and developer productivity tools. Learn automation, data extraction, and build powerful developer tools.',
    site_url: 'https://toolplane.xyz',
    feed_url: 'https://toolplane.xyz/feed.xml',
    copyright: `© ${new Date().getFullYear()} Toolplane`,
    language: 'en-US',
    pubDate: posts.length > 0 ? posts[0].publishedAt : new Date(),
    ttl: 60,
    generator: 'Toolplane RSS Generator',
    categories: [
      'Web Scraping',
      'Developer Tools',
      'API Development',
      'Automation',
      'Data Extraction',
      'Programming',
      'Technology'
    ],
    custom_namespaces: {
      content: 'http://purl.org/rss/1.0/modules/content/',
      atom: 'http://www.w3.org/2005/Atom',
    },
    custom_elements: [
      {
        'atom:link': {
          _attr: {
            href: 'https://toolplane.xyz/feed.xml',
            rel: 'self',
            type: 'application/rss+xml'
          }
        }
      }
    ]
  });

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.description,
      url: generateBlogPostUrl(post.slug),
      guid: generateBlogPostUrl(post.slug),
      categories: post.tags,
      author: post.author || 'Toolplane Team',
      date: post.publishedAt,
      custom_elements: [
        {
          'content:encoded': {
            _cdata: `
              <p>${post.description}</p>
              <p><strong>Tags:</strong> ${post.tags.join(', ')}</p>
              <p><strong>Reading time:</strong> ${post.readingTime}</p>
              <p><a href="${generateBlogPostUrl(post.slug)}">Read full article on Toolplane</a></p>
            `
          }
        }
      ]
    });
  });

  return feed.xml({ indent: true });
} 