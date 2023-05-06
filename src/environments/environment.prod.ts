import pkg from '../../package.json';

export const environment = {
  production: true,
  name: pkg.name,
  version: pkg.version,
    // proxy: 'https://cors-anywhere.azm.workers.dev/',
    proxy: '',
    apiUrl: 'https://nanosoft.co.nz/',
    // apiUrl: 'http://parkhomov/',
    httpMaxRetries: 3,
    httpRetryDelay: 200
};