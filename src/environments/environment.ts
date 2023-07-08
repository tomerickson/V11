// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import pkg from '../../package.json';

export const environment = {
  production: false,
  name: pkg.name,
  version: pkg.version,
  // proxy: 'https://cors-anywhere.azm.workers.dev/',
  proxy: '',
  apiUrl: 'https://nanosoft.co.nz/',
  // apiUrl: 'http://parkhomov/',
  /**
   * Number of time to retry an http request
   */
  httpMaxRetries: 3,
  /**
   * Delay in milliseconds before initial retry
   * 
   * Subsequent retries are delayed by (# of retries * httpRetryDelay)
   *
   */
  httpRetryDelay: 200
}
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
