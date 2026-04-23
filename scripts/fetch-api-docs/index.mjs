/* eslint-disable no-console, import/extensions */
import fs from 'fs';
import path from 'path';
import YAML from 'yaml';
import { fileURLToPath } from 'url';
import { loadYaml, buildSpec, parseMajorMinor } from './utils.mjs';
import { SERVICES } from './constants.mjs';

const ROOT = process.cwd();
const CURRENT_FILE = fileURLToPath(import.meta.url);
const CURRENT_DIR = path.dirname(CURRENT_FILE);

/**
 * Loads a spec from a remote URL.
 */
async function fetchSpec(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Failed to load spec from ${url}: ${error.message}`);
  }
}

/**
 * Reads the current spec from a file.
 */
function getCurrentSpec(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      return null;
    }
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    throw new Error(`Failed to read ${filePath}: ${error.message}`);
  }
}

/**
 * Writes a spec to a JSON file.
 */
function writeSpec(filePath, spec) {
  try {
    const json = JSON.stringify(spec, null, 2);
    fs.writeFileSync(filePath, `${json}\n`, 'utf8');
    console.log(`Wrote ${filePath}`);
  } catch (error) {
    throw new Error(`Failed to write ${filePath}: ${error.message}`);
  }
}

/**
 * Archives the old spec as YAML under its version directory.
 */
function archiveSpec(spec, version, serviceConfig) {
  try {
    const archiveDir = path.resolve(ROOT, 'apis', version);
    if (!fs.existsSync(archiveDir)) {
      fs.mkdirSync(archiveDir, { recursive: true });
    }

    const filename = `service-${serviceConfig.key}.yaml`;
    const archivePath = path.resolve(archiveDir, filename);
    const yaml = YAML.stringify(spec);
    fs.writeFileSync(archivePath, yaml, 'utf8');
    console.log(`[${serviceConfig.name}] Archived ${archivePath}`);
  } catch (error) {
    throw new Error(`Failed to archive spec: ${error.message}`);
  }
}

/**
 * Updates the versions config when a new version needs to be added.
 * Versions config is the single source of truth in src/config/versions/.
 */
function updateVersionsConfig(newVersion, serviceConfig) {
  try {
    const versionsConfigPath = path.resolve(
      ROOT,
      `src/config/versions/service-${serviceConfig.key}.json`,
    );
    let versionsConfig = JSON.parse(fs.readFileSync(versionsConfigPath, 'utf8'));
    versionsConfig = versionsConfig.filter((entry) => entry.version !== newVersion); // Deduplicate: remove if version already exists
    versionsConfig = [{ version: newVersion }, ...versionsConfig]; // Prepend new version (becomes current, maintains descending order)

    const json = JSON.stringify(versionsConfig, null, 2);
    fs.writeFileSync(versionsConfigPath, `${json}\n`, 'utf8');
    console.log(`[${serviceConfig.name}] Versions config updated: added version ${newVersion}`);
  } catch (error) {
    throw new Error(`Failed to update versions config: ${error.message}`);
  }
}

/**
 * Runs the update flow for a single service.
 */
async function processService(config) {
  try {
    console.log(`[${config.name}] Processing...`);

    const templateFile = path.resolve(CURRENT_DIR, `templates/services/${config.key}.yaml`);
    const currentFile = path.resolve(ROOT, `apis/service-${config.key}.json`);

    // Load the remote spec.
    const remoteSpec = await fetchSpec(config.url);
    const remoteMajorMinor = parseMajorMinor(remoteSpec.info.version);

    // Load the current spec if it already exists.
    const currentSpec = getCurrentSpec(currentFile);
    const currentMajorMinor = currentSpec ? parseMajorMinor(currentSpec.info.version) : null;

    console.log(`[${config.name}] Current version: ${currentMajorMinor || 'none'}`);
    console.log(`[${config.name}] Remote version: ${remoteMajorMinor}`);

    // Load the templates.
    const commonTemplate = loadYaml(path.resolve(CURRENT_DIR, 'templates/common.yaml'));
    const serviceTemplate = loadYaml(templateFile);

    // Build the final merged spec.
    const resultSpec = buildSpec(remoteSpec, commonTemplate, serviceTemplate);

    // Compare major.minor versions.
    if (currentMajorMinor && currentMajorMinor !== remoteMajorMinor) {
      // A new major.minor version was detected, so archive the old spec.
      console.warn(
        `[${config.name}] New version detected: ${currentMajorMinor} -> ${remoteMajorMinor}`,
      );
      archiveSpec(currentSpec, currentMajorMinor, config);
      updateVersionsConfig(remoteMajorMinor, config);
    } else if (currentMajorMinor === remoteMajorMinor) {
      console.log(`[${config.name}] Patch update for version ${remoteMajorMinor}`);
    } else {
      console.log(`[${config.name}] First import`);
    }

    // Write the new current spec.
    writeSpec(currentFile, resultSpec);
    console.log(`[${config.name}] Updated to version ${remoteMajorMinor}\n`);
  } catch (error) {
    console.error(`[${config.name}] Failed to process: ${error.message}`);
    throw error;
  }
}

/**
 * Entry point.
 */
async function main() {
  try {
    console.log('=== Starting API spec update ===');

    // Process both services in parallel.
    await Promise.all(SERVICES.map((config) => processService(config)));

    console.log('=== Completed successfully ===\n');
  } catch (error) {
    console.error(`Critical error: ${error.message}`);
    process.exit(1);
  }
}

main();
