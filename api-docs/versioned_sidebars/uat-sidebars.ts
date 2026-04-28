import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';
import { versionSelector, versionCrumb } from 'docusaurus-plugin-openapi-docs/lib/sidebars/utils';
import serviceUatVersions from '../service-uat/versions.json';
import serviceUatVersionsConfig from '../../src/config/versions/service-uat.json';

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
        value: versionSelector(serviceUatVersions),
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
          description: 'This is a generated index of the ReportPortal Authorization API.',
          slug,
        },
        items: require(requirePath),
      },
    ],
  };
}

const uatSidebars: SidebarsConfig = {
  // This is the sidebar for current version of the Service UAT
  ...buildSidebarEntry(
    'serviceUat',
    serviceUatVersionsConfig[0].version,
    'Service Authorization',
    '/category/service-uat',
    '../service-uat/sidebar.ts'
  ),
  // This is the sidebar for versioned Service UAT
  ...serviceUatVersionsConfig
    .slice(1)
    .map((entry: any) =>
      buildSidebarEntry(
        `service-uat-${entry.version}`,
        entry.version,
        'Service Authorization',
        `/category/service-uat-${entry.version}`,
        `../service-uat/versions/${entry.version}/sidebar.ts`
      )
    )
    .reduce((acc: any, obj: any) => ({ ...acc, ...obj }), {}),
};

export default uatSidebars;
