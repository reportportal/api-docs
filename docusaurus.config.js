// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

import { themes } from 'prism-react-renderer';
import openapiConfig from './src/config/openapi.config.js';

const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

require('dotenv').config();

// the default baseUrl is for production deployment, for dev running specify it via DOCS_BASE_URL environment variable
const baseUrl = process.env.DOCS_BASE_URL || '/api-docs/';

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
        docs: {
          routeBasePath: '/',
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
            'test automation dashboard, ReportPortal manual, ReportPortal guide, ReportPortal documentation, test results dashboard, Centralized test reporting, real time test results, Automated defect triaging, Testops, Test management system, Test automation reporting',
        },
      ],
      navbar: {
        hideOnScroll: true,
        logo: {
          alt: 'ReportPortal logo',
          src: 'img/logo.svg',
          srcDark: 'img/logo-dark.svg',
          href: '/',
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
                to: '/category/service-api',
                activeBasePath: '/category/service-api',
              },
              {
                label: 'Service UAT',
                to: '/category/service-uat',
                activeBasePath: '/category/service-uat',
              },
              {
                label: 'API Design',
                to: '/category/api-design',
                activeBasePath: '/category/api-design',
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
        ...openapiConfig(baseUrl),
      },
    ],
  ],
};

export default config;
