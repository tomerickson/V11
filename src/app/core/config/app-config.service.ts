import { Injectable } from '@angular/core';
import configs from '../../../assets/config/config.json';
import { IAppConfig } from './iapp-config.model';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  /**
   * Initialize a set of invalid config properties
   */
  private _appConfig: IAppConfig = {
    production: false,
    name: 'Uninitiialized',
    version: '?',
    proxy: null,
    apiUrl: '?',
    httpMaxRetries: -1,
    httpRetryDelay: -1
  };

  constructor() {

    this._appConfig = configs; // load the valid config entries
  }

  validateConfiguration() {

    let ok = (this.apiUrl !== '?')
    if (!ok) {
      console.error('No configuration file found');
    }
    return () => new Promise((resolve, reject) => ok)
  }

  get version(): string {
    return this._appConfig.version;
  }

  get apiUrl(): string {
    return this._appConfig.apiUrl;
  }

  get  proxy(): string | null {
    return this._appConfig.proxy;
  }

  get retryDelay(): number {
    return this._appConfig.httpRetryDelay;
  }
  get maxRetries(): number {
    return this._appConfig.httpMaxRetries;
  }
  get production(): boolean {
    return this._appConfig.production;
  }
}
