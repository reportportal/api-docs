import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';
import { versionSelector, versionCrumb } from 'docusaurus-plugin-openapi-docs/lib/sidebars/utils';
import serviceApiVersions from '../service-api/versions.json';
import serviceApiVersionsConfig from '../../src/config/versions/service-api.json';

function buildSidebarEntry(
  sidebarKey: string,
  version: string,
  label: string,
  slug: string,
  requirePath: string
) {
  return {
    [sidebarKey]: [
      {
        type: 'html',
        defaultStyle: false,
        value: versionSelector(serviceApiVersions),
        className: 'version-button',
      },
      {
        type: 'html',
        defaultStyle: false,
        value: versionCrumb(`v${version}`),
        className: 'version-crumb',
      },
      {
        type: 'category',
        label,
        link: {
          type: 'generated-index',
          title: label,
          description: 'This is a generated index of the ReportPortal Service API.',
          slug,
        },
        items: require(requirePath),
      },
    ],
  };
}

const apiSidebars: SidebarsConfig = {
  // This is the sidebar for current version of the API Service
  ...buildSidebarEntry(
    'serviceApi',
    serviceApiVersionsConfig[0].version,
    'Service API',
    '/category/service-api',
    '../service-api/sidebar.ts'
  ),
  // This is the sidebar for versioned Service API
  ...serviceApiVersionsConfig
    .slice(1)
    .map((entry: any) =>
      buildSidebarEntry(
        `service-api-${entry.version}`,
        entry.version,
        'Service API',
        `/category/service-api-${entry.version}`,
        `../service-api/versions/${entry.version}/sidebar.ts`
      )
    )
    .reduce((acc: any, obj: any) => ({ ...acc, ...obj }), {}),
};

export default apiSidebars;
