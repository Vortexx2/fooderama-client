/**
 *
 * @param {import("vue-router").RouteLocationNormalizedLoaded} to
 * @param {string[]} paramNames
 */
export function checkNumericalParams(to, paramNames) {
  for (const param of paramNames) {
    const parsedParam = parseInt(to.params[param], 10)
    if (isNaN(parsedParam)) return false
  }

  return true
}
