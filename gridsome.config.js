// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'הבלוג של גו-קוד',
  siteDescription: 'בלוג עם קוד, קוד ועוד קצת קוד',

  templates: {
    Post: '/:slug',
    Tag: '/tag/:id'
  },

  plugins: [
    {
      // Create posts from markdown files
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Post',
        path: 'content/posts/*.md',
        refs: {
          // Creates a GraphQL collection from 'tags' in front-matter and adds a reference.
          tags: {
            typeName: 'Tag',
            create: true
          }
        }
      }
    },
    {
      use: '@gridsome/plugin-google-analytics',
      options: {
        id: 'UA-47062887-8'
      }
    },
    {
      use: '~/gridsome-plugin-pwa',
      options: {
        title: 'GoCode Blog',
        startUrl: '/',
        display: 'standalone',
        statusBarStyle: 'default',
        manifestPath: 'manifest.json',
        serviceWorkerPath: 'service-worker.js',
        shortName: 'GoCode Blog',
        themeColor: '#666600',
        backgroundColor: '#ffffff',
        icon: './src/favicon.png'
      }
    },
    {
      use: 'gridsome-plugin-rss',
      options: {
        contentTypeName: 'Post',
        feedOptions: {
          title: 'הבלוג של גו-קוד',
          feed_url: 'https://blog.gocode.co.il/rss.xml',
          site_url: 'https://blog.gocode.co.il'
        },
        feedItemOptions: node => ({
          title: node.title,
          description: node.description,
          url: 'https://blog.gocode.co.il/' + node.slug,
          author: node.author
        }),
        output: {
          dir: './static',
          name: 'rss.xml'
        }
      }
    }
  ],

  transformers: {
    //Add markdown support to all file-system sources
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      anchorClassName: 'icon icon-link',
      plugins: ['@gridsome/remark-prismjs']
    }
  }
};
