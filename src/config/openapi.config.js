import serviceApiVersionsConfig from './versions/service-api.json';
import serviceUatVersionsConfig from './versions/service-uat.json';

function buildServiceConfig(baseUrl, key, versionsConfig) {
  const [current, ...archived] = versionsConfig;
  const versions = {};

  archived.forEach((entry) => {
    versions[entry.version] = {
      specPath: `apis/${entry.version}/service-${key}.yaml`,
      outputDir: `api-docs/service-${key}/versions/${entry.version}`,
      label: `v${entry.version}`,
      baseUrl: `${baseUrl}category/service-${key}-${entry.version}`,
    };
  });

  return {
    specPath: `apis/service-${key}.json`, // path or URL to the OpenAPI spec
    outputDir: `api-docs/service-${key}`, // output directory for generated *.mdx and sidebar.js files
    sidebarOptions: {
      groupPathsBy: 'tag', // generate a sidebar.js slice that groups operations by tag
      categoryLinkSource: 'tag',
    },
    version: current.version,
    label: `v${current.version}`,
    baseUrl: `${baseUrl}category/service-${key}`,
    versions,
  };
}

const openapiConfig = (baseUrl = '/') => ({
  config: {
    designApi: {
      specPath:
        'https://raw.githubusercontent.com/reportportal/api-registry/refs/heads/main/api/openapi/reportportal-api.yaml',
      outputDir: 'api-docs/api-design',
      sidebarOptions: {
        groupPathsBy: 'tag',
        categoryLinkSource: 'tag',
      },
    },
    // "service Api" is considered the <id> that you will reference in the CLI
    serviceApi: buildServiceConfig(baseUrl, 'api', serviceApiVersionsConfig),
    serviceUat: buildServiceConfig(baseUrl, 'uat', serviceUatVersionsConfig),
  },
});

export default openapiConfig;
