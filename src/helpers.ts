export const replaceCallbacks = (obj: any) => {
  for (var i in obj) {

    if (typeof obj[i] === 'function') {
      obj[i] = (...args: any) => console.info(`Callback ${i} called with attribs: `, args);
      continue;
    }

    if (isObject(obj[i])) {
      obj[i] = replaceCallbacks(obj[i])
      continue;
    }
  }

  return obj;
};

/**
 * Checks if variable is an object
 * @param val 
 */
export const isObject = (val: any) => {
  if (val === null) { 
    return false;
  }

  return ( (typeof val === 'function') || (typeof val === 'object') );
}
