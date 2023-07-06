export default function isJson(item) {
  let newItem = typeof item !== 'string' ? JSON.stringify(item) : item;

  try {
    newItem = JSON.parse(item);
  } catch (e) {
    return false;
  }

  return typeof newItem === 'object' && newItem !== null;
}
