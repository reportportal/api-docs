import 'dotenv/config';
import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';
import designSidebar from './api-design/sidebar';
import apiSidebars from './versioned_sidebars/api-sidebars';
import uatSidebars from './versioned_sidebars/uat-sidebars';

const baseUrl = process.env.DOCS_BASE_URL || '/';

const apiSidebarsConfig: SidebarsConfig = {
  apiOverview: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Overview',
    },
    {
      type: 'doc',
      id: 'authorization',
      label: 'Authorization',
    },
    {
      type: 'link',
      href: `${baseUrl}category/service-api`,
      label: 'Service API',
    },
    {
      type: 'link',
      href: `${baseUrl}category/service-uat`,
      label: 'Service Authorization',
    },
    {
      type: 'link',
      href: `${baseUrl}category/api-design`,
      label: 'API Design',
    },
  ],
  apiDesign: [
    {
      type: 'category',
      label: 'API Documentation',
      link: {
        type: 'generated-index',
        title: 'ReportPortal API',
        description: 'This is a generated index of the ReportPortal API Documentation.',
        slug: '/category/api-design',
      },
      items: designSidebar,
    },
  ],
  ...apiSidebars,
  ...uatSidebars,
};

export { apiSidebarsConfig };
