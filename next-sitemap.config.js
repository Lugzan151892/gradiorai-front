/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://gradiorai.ru/',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/system', '/system/*'],
};
