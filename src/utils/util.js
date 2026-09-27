// utils.js - migrated from app/js/util.js

// dateDiff: returns absolute day difference between two dates
export function dateDiff(x, y) {
  const dx = new Date(x);
  const dy = new Date(y);
  return parseInt(Math.abs((dy - dx) / 1000 / 60 / 60 / 24), 10);
}

// isLocalStorageSupported: feature-detects localStorage availability
export function isLocalStorageSupported() {
  const testKey = 'test';
  try {
    window.localStorage.setItem(testKey, '1');
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

// getBrowser: detects chrome version from user agent (migrated from browserSvc)
export function getBrowser() {
  const browsers = [{ name: 'chrome/', classPrefix: 'cr' }];
  const bObj = {};
  const ua = navigator.userAgent.toLowerCase();
  browsers.forEach((item) => {
    const bw = ua.substr(ua.indexOf(item.name));
    const ver = bw.substr(item.name.length, bw.indexOf('.'));
    item.fullVersion = ver;
    item.version = ver.split('.')[0];
  });
  browsers.forEach((item) => {
    const name = item.name.replace('/', '');
    bObj[name] = item.version;
  });
  return bObj;
}

// getWins: filters challenges array for those with winning placements
export function getWins(inputArray) {
  return (inputArray || []).filter((el) => el.userDetails && el.userDetails.winningPlacements);
}

// getProTechs: derive icon class names from a comma separated technologies string
export function getProTechs(item) {
  const tech = item.technologies.replace(' ', '').split(',');
  return tech.map((el) => `icon-${el.toLowerCase()}`.replace(/[ .]/g, ''));
}

// getTechTitle: format an icon class name back into a readable title
export function getTechTitle(iconName) {
  if (iconName === undefined) return false;
  const cleaned = iconName.replace('icon-', '').replace('html', 'HTML').replace('css', 'CSS');
  return cleaned.substr(0, 1).toUpperCase() + cleaned.substr(1);
}
