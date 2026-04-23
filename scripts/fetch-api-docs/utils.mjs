import fs from 'fs';
import { parseFragment, serialize } from 'parse5';
import YAML from 'yaml';

const TEXT_KEYS = ['description', 'summary', 'title', 'example'];

/**
 * Normalizes serialized HTML by collapsing formatting newlines and indentation
 * that appear between adjacent tags, while keeping tag content unchanged.
 */
function normalizeHtmlString(html) {
  if (typeof html !== 'string') return html;

  return html
    .replace(/\n\s*</g, '<')
    .replace(/>\s*\n/g, '>')
    .trim();
}

/**
 * Repairs malformed HTML fragments using browser-like parsing.
 * @param {string} value
 * @returns {string}
 */
function repairHtml(value) {
  if (typeof value !== 'string' || value.indexOf('<') === -1) {
    return value;
  }

  try {
    const parsed = parseFragment(value);
    const fixed = serialize(parsed);
    return normalizeHtmlString(fixed);
  } catch {
    return value;
  }
}

/**
 * Applies HTML repair to OpenAPI text fields recursively.
 * @param {any} value
 * @returns {any}
 */
function repairOpenApiTextFields(value) {
  if (Array.isArray(value)) {
    return value.map((item) => repairOpenApiTextFields(item));
  }

  if (!value || typeof value !== 'object') {
    return value;
  }

  return Object.entries(value).reduce(
    (result, [key, nested]) => ({
      ...result,
      [key]:
        TEXT_KEYS.includes(key) && typeof nested === 'string'
          ? repairHtml(nested)
          : repairOpenApiTextFields(nested),
    }),
    {},
  );
}

/**
 * Loads and parses a YAML file.
 * @param {string} filePath - Path to the file.
 * @returns {object} Parsed YAML content.
 */
export function loadYaml(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  return YAML.parse(content);
}

/**
 * Builds the final spec by merging the remote spec with local templates.
 * @param {object} remoteSpec - Spec fetched from the remote API.
 * @param {object} commonTemplate - Shared template for info and security schemes.
 * @param {object} serviceTemplate - Service-specific template for title and servers.
 * @returns {object} Merged spec.
 */
export function buildSpec(remoteSpec, commonTemplate, serviceTemplate) {
  const sanitizedRemoteSpec = repairOpenApiTextFields(remoteSpec);

  return {
    ...sanitizedRemoteSpec,

    info: {
      ...sanitizedRemoteSpec.info,
      description: commonTemplate.info.description,
      contact: commonTemplate.info.contact,
      license: commonTemplate.info.license,
      title: serviceTemplate.info.title,
      // Keep the version from the remote spec.
    },

    servers: serviceTemplate.servers,

    components: {
      ...remoteSpec.components,
      securitySchemes: commonTemplate.components.securitySchemes,
    },

    security: commonTemplate.security,
  };
}

/**
 * Extracts major or major.minor from a version string.
 * Assumes API provides a valid version format.
 * @param {string} version - Version string like "36", "36.1", or "36.1.2".
 * @returns {string} Version string like "36" or "36.1".
 */
export function parseMajorMinor(version) {
  if (typeof version !== 'string' && typeof version !== 'number') {
    throw new Error(`Invalid version value: ${version}`);
  }

  const normalizedVersion = String(version).trim();

  if (normalizedVersion.length === 0) {
    throw new Error(`Invalid version value: ${version}`);
  }

  const [major, minor] = normalizedVersion.split('.');

  if (!Number.isInteger(Number(major))) {
    throw new Error(`Invalid MAJOR version: ${normalizedVersion}`);
  }

  if (minor !== undefined && !Number.isInteger(Number(minor))) {
    throw new Error(`Invalid MINOR version: ${normalizedVersion}`);
  }

  return minor === undefined ? major : `${major}.${minor}`;
}

/**
 * Compares MAJOR.MINOR semantic versions.
 * @param {string} left - Version in MAJOR or MAJOR.MINOR format.
 * @param {string} right - Version in MAJOR or MAJOR.MINOR format.
 * @returns {number} Negative if left < right, positive if left > right, otherwise 0.
 */
export function compareMajorMinor(left, right) {
  const toParts = (value) => {
    const normalized = parseMajorMinor(value);
    const [majorRaw, minorRaw = '0'] = normalized.split('.');
    return [Number(majorRaw), Number(minorRaw)];
  };

  const [leftMajor, leftMinor] = toParts(left);
  const [rightMajor, rightMinor] = toParts(right);

  if (leftMajor !== rightMajor) {
    return leftMajor - rightMajor;
  }

  return leftMinor - rightMinor;
}
