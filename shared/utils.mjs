/**
 * Extracts major or major.minor from a version string.
 * Assumes API provides a valid version format.
 * @param {string} version - Version string like "36", "36.1", or "36.1.2".
 * @returns {string} Version string like "36" or "36.1".
 */
export function parseMajorMinor(version) {
  const [major, minor] = version.split('.');
  return minor === undefined ? major : `${major}.${minor}`;
}
