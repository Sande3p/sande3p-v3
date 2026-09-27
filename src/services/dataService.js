// dataService.js - migrated from app/js/services.js (dataSvc)
import { config } from '../config';

async function getJson(url) {
  const res = await fetch(url);
  return res.json();
}

export function getConfig() {
  return config;
}

export function getBasic() {
  return getJson(config.basic || '/data/basic.json');
}

export function getStat() {
  return getJson(config.stat || '/data/stat.json');
}

export function getHistory() {
  return getJson(config.history || '/data/history.json');
}

export function getLatestStat() {
  return getJson(config.latestStat || '/data/latest-stat.json');
}
