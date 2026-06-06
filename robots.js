export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://www.acceptanceconsulting.com/sitemap.xml',
  };
}
