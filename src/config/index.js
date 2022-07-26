import devConfig from './dev';

/**
 * Function to return the appropriate config according to the type of environment we are working in.
 * @returns the config according to the environment we are working in
 */
function decideConfig() {
  if (process.env.NODE_ENV === 'development') {
    return devConfig;
  }
}

export default decideConfig();
