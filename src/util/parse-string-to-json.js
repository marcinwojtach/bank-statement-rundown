import isJson from './is-json';

export default function parseStringToJSON(config) {
  if (config.length === 0) {
    return {};
  }

  const json = JSON.parse(config);

  return isJson(json) ? json : {};
};