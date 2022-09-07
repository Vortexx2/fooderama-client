import _ from 'lodash'
// Imports above

/**
 * Empties all values that are held in an object.
 * @param {Record<string, string>} obj
 */
export function emptyAllValues(obj) {
  _.forEach(obj, (value, key) => {
    obj[key] = ''
  })
}
