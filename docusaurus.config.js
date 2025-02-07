// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

import { themes } from 'prism-react-renderer';
import openapiConfig from './src/config/openapi.config.js';

const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

require('dotenv').config();

const baseUrl = '/';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'ReportPortal API Documentation',
  url: 'https://developers.reportportal.io',
  baseUrl,
  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',
  onBrokenMarkdownLinks: 'throw',
  onDuplicateRoutes: 'throw',
  favicon: 'img/favicon.ico',

  organizationName: 'reportportal',
  projectName: 'documentation',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        sitemap: {
          changefreq: 'weekly',
          ignorePatterns: [
            '/api-docs/category/**',
            '/api-docs/service-api/**',
            '/api-docs/service-uat/**',
            '/api-docs/api-design/**',
          ],
          filename: 'sitemap.xml',
        },
        docs: {
          routeBasePath: 'api-docs',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/reportportal/api-docs/blob/develop',
          docRootComponent: '@theme/DocRoot',
          docItemComponent: '@theme/ApiItem', // Derived from docusaurus-theme-openapi
          path: 'api-docs',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        googleTagManager: {
          containerId: 'GTM-MK7ZHTL',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      metadata: [
        {
          name: 'keywords',
          content:
            'test automation metrics dashboard, ReportPortal manual, ReportPortal guide, ReportPortal API documentation, test results dashboard, automated defect triaging, Testops, Test management system, test automation reporting tool, test results reporting service, test report dashboard',
        },
      ],
      navbar: {
        hideOnScroll: true,
        logo: {
          alt: 'ReportPortal logo',
          src: 'img/logo.svg',
          srcDark: 'img/logo-dark.svg',
          href: '/api-docs/',
        },
        items: [
          {
            position: 'left',
            label: 'Docs',
            to: 'https://reportportal.io/docs/',
            target: '_self',
          },
          {
            label: 'APIs',
            position: 'left',
            type: 'dropdown',
            className: 'api-dropdown',
            items: [
              {
                label: 'Overview',
                type: 'doc',
                docId: 'intro',
              },
              {
                label: 'Service API',
                to: 'api-docs/category/service-api',
                activeBasePath: 'api-docs/category/service-api',
              },
              {
                label: 'Service UAT',
                to: 'api-docs/category/service-uat',
                activeBasePath: 'api-docs/category/service-uat',
              },
              {
                label: 'API Design',
                to: 'api-docs/category/api-design',
                activeBasePath: 'api-docs/category/api-design',
              },
            ],
          },
          {
            href: 'https://reportportal.io/',
            label: 'ReportPortal.io',
            position: 'right',
          },
          {
            href: 'https://github.com/reportportal',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Learn',
            items: [
              {
                label: 'What is ReportPortal?',
                to: 'https://reportportal.io/docs/',
              },
              {
                label: 'ReportPortal Tutorial',
                to: 'https://reportportal.io/docs/tutorial/',
              },
              {
                label: 'Installation steps',
                to: 'https://reportportal.io/docs/installation-steps',
              },
              {
                label: 'RP Configuration',
                to: 'https://reportportal.io/docs/configuration',
              },
              {
                label: 'Developers Guide',
                to: 'https://reportportal.io/docs/developers-guides',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Twitter',
                href: 'https://twitter.com/ReportPortal_io',
              },
              {
                label: 'YouTube',
                href: 'https://www.youtube.com/c/ReportPortal',
              },
              {
                label: 'Slack',
                href: 'https://slack.epmrpp.reportportal.io/',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'ReportPortal.io',
                href: 'https://reportportal.io/',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/reportportal',
              },
            ],
          },
          {
            title: 'Legal',
            items: [
              {
                label: 'Terms & Conditions',
                href: 'https://reportportal.io/legal/terms',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} ReportPortal. Sponsored by EPAM. <br> Licensed under Apache v2.0.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: [
          'bash',
          'diff',
          'json',
          'java',
          'python',
          'yaml',
          'http',
          'javascript',
          'typescript',
          'go',
          'docker',
          'csharp',
          'git',
          'ini',
          'sql',
          'plsql',
          'jsx',
        ],
      },
      search: false,
    }),

  themes: ['docusaurus-theme-openapi-docs'], // exports ApiItem and ApiDemoPanel

  plugins: [
    './plugins/plugin-cookie-pro',
    [
      'docusaurus-plugin-openapi-docs',
      {
        id: 'openapi',
        docsPluginId: 'classic', // e.g. "classic" or the plugin-content-docs id
        ...openapiConfig('/api-docs/'),
      },
    ],
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            to: '/api-docs/',
            from: '/',
          },
        ],
      },
    ],
  ],
};

export default config;
