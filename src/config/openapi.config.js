const openapiConfig = (baseUrl) => ({
  config: {
    designApi: {
      specPath:
        'https://raw.githubusercontent.com/reportportal/api-registry/detached/api/openapi/reportportal-api.yaml',
      outputDir: 'api-docs/api-design',
      sidebarOptions: {
        groupPathsBy: 'tag',
        categoryLinkSource: 'tag',
      },
    },
    serviceApi: {
      // "service Api" is considered the <id> that you will reference in the CLI
      specPath: 'apis/service-api.json', // path or URL to the OpenAPI spec
      outputDir: 'api-docs/service-api', // output directory for generated *.mdx and sidebar.js files
      sidebarOptions: {
        groupPathsBy: 'tag', // generate a sidebar.js slice that groups operations by tag
        categoryLinkSource: 'tag',
      },
      version: '5.14',
      label: 'v5.14',
      baseUrl: `${baseUrl}category/service-api`, // base URL for the API docs,
      versions: {
        5.12: {
          specPath: 'apis/5.12/service-api.yaml',
          outputDir: 'api-docs/service-api/versions/5.12',
          label: 'v5.12',
          baseUrl: `${baseUrl}category/service-api-5.12`,
        },
        5.11: {
          specPath: 'apis/5.11/service-api.yaml',
          outputDir: 'api-docs/service-api/versions/5.11',
          label: 'v5.11',
          baseUrl: `${baseUrl}category/service-api-5.11`,
        },
        '5.10': {
          specPath: 'apis/5.10/service-api.yaml',
          outputDir: 'api-docs/service-api/versions/5.10',
          label: 'v5.10',
          baseUrl: `${baseUrl}category/service-api-5.10`,
        },
      },
    },
    serviceUat: {
      specPath: 'apis/service-uat.json',
      outputDir: 'api-docs/service-uat',
      sidebarOptions: {
        groupPathsBy: 'tag',
        categoryLinkSource: 'tag',
      },
      version: '5.14',
      label: 'v5.14',
      baseUrl: `${baseUrl}category/service-uat`,
      versions: {
        5.12: {
          specPath: 'apis/5.12/service-uat.yaml',
          outputDir: 'api-docs/service-uat/versions/5.12',
          label: 'v5.12',
          baseUrl: `${baseUrl}category/service-uat-5.12`,
        },
        5.11: {
          specPath: 'apis/5.11/service-uat.yaml',
          outputDir: 'api-docs/service-uat/versions/5.11',
          label: 'v5.11',
          baseUrl: `${baseUrl}category/service-uat-5.11`,
        },
        '5.10': {
          specPath: 'apis/5.10/service-uat.yaml',
          outputDir: 'api-docs/service-uat/versions/5.10',
          label: 'v5.10',
          baseUrl: `${baseUrl}category/service-uat-5.10`,
        },
      },
    },
  },
});

export default openapiConfig;
