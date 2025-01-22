import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";
import designSidebar from './api-design/sidebar';
import apiSidebars from './versioned_sidebars/api-sidebars';
import uatSidebars from './versioned_sidebars/uat-sidebars';

const apiSidebarsConfig: SidebarsConfig = {
  apiOverview: [
    {
      type: 'doc',
      id: 'intro',
      label: 'API Overview',
    },
    {
      type: 'link',
      href: '/category/service-api',
      label: 'Service API',
    },
    {
      type: 'link',
      href: '/category/service-uat',
      label: 'Authorization API',
    },
    {
      type: 'link',
      href: '/api-design/reportportal-api',
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
