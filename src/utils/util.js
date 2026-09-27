// utils.js - migrated from app/js/util.js

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

const DEVICON_CLASS_MAP = {
  css: 'devicon-css3-plain',
  css3: 'devicon-css3-plain',
  html: 'devicon-html5-plain',
  html5: 'devicon-html5-plain',
  js: 'devicon-javascript-plain',
  javascript: 'devicon-javascript-plain',
  ts: 'devicon-typescript-plain',
  typescript: 'devicon-typescript-plain',
  vue: 'devicon-vuejs-plain',
  vuejs: 'devicon-vuejs-plain',
  react: 'devicon-react-original',
  reactnative: 'devicon-react-original',
  'react-native': 'devicon-react-original',
  angular: 'devicon-angularjs-plain',
  angularjs: 'devicon-angularjs-plain',
  node: 'devicon-nodejs-plain',
  nodejs: 'devicon-nodejs-plain',
  sql: 'devicon-mysql-plain',
  mysql: 'devicon-mysql-plain',
  mongodb: 'devicon-mongodb-plain',
  'aws-lambda': 'devicon-amazonwebservices-plain-wordmark',
  awslambda: 'devicon-amazonwebservices-plain-wordmark',
  amazonsqs: 'devicon-amazonwebservices-plain-wordmark',
  rabbitmq: 'devicon-rabbitmq-original',
  json: 'devicon-json-plain',
  php: 'devicon-php-plain',
  wordpress: 'devicon-wordpress-plain',
  ionic: 'devicon-ionic-original',
  express: 'devicon-express-original',
  d3: 'devicon-d3js-plain',
  d3js: 'devicon-d3js-plain',
  'ci-cd': 'devicon-azuredevops-plain',
  cicd: 'devicon-azuredevops-plain',
};

// getProTechs: derive valid Devicon class names from a technology string or list
export function getProTechs(item) {
  const rawTechnologies = item?.technologies;
  const technologies = Array.isArray(rawTechnologies)
    ? rawTechnologies
    : String(rawTechnologies || '').split(',');

  return technologies
    .map((tech) => String(tech).trim())
    .filter(Boolean)
    .map((tech) => {
      const key = tech.toLowerCase().replace(/[ .()/]/g, '');
      return DEVICON_CLASS_MAP[key] || `devicon-${key}-plain`;
    });
}

// getTechTitle: format a technology class name back into a readable title
export function getTechTitle(iconName) {
  if (iconName === undefined || iconName === null) return false;

  const raw = iconName
    .replace(/^devicon-/, '')
    .replace(/\s+colored$/, '')
    .replace(/-plain(-wordmark)?$/, '')
    .replace(/-original(-wordmark)?$/, '')
    .toLowerCase();

  const techTitleMap = {
    css3: 'CSS',
    html5: 'HTML5',
    javascript: 'JavaScript',
    typescript: 'TypeScript',
    vuejs: 'Vue',
    react: 'React',
    reactnative: 'React Native',
    angularjs: 'Angular.js',
    nodejs: 'Node.js',
    mysql: 'MySQL',
    mongodb: 'MongoDB',
    amazonwebservices: 'AWS',
    rabbitmq: 'RabbitMQ',
    json: 'JSON',
    php: 'PHP',
    wordpress: 'WordPress',
    ionic: 'Ionic',
    express: 'Express',
    d3js: 'D3.js',
    vue: 'Vue',
    js: 'JavaScript',
    ts: 'TypeScript',
    css: 'CSS',
  };

  if (techTitleMap[raw]) return techTitleMap[raw];

  const fallback = raw
    .replace(/[-_]+/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\s+/g, ' ')
    .trim();

  if (!fallback) return false;
  return fallback.charAt(0).toUpperCase() + fallback.slice(1);
}
