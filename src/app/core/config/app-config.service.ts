import { Injectable } from '@angular/core';
import localConfigs from '../../../assets/config/config.json';
import globalConfigs from '../../../assets/config/global-config.json';
import { IAppConfig } from './iapp-config.model';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  /**
   * Initialize a default set of config properties
   */
  private _appConfig: IAppConfig = {
    production: false,
    name: 'Uninitiialized',
    version: '',
    proxy: null,
    apiUrl: '?',
    virtualDirectory: null,
    httpMaxRetries: -1,
    httpRetryDelay: -1,
    pageCredits: '',
    allTablesPageSize: 1
  };

  constructor() {
    Object.assign(this._appConfig, localConfigs, globalConfigs);
    console.log('config', JSON.stringify(this._appConfig));
  }

  validateConfiguration() {

    let ok = (this.apiUrl !== '?'
    && this.pageCredits !== '');
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

  get virtualDirectory(): string | null {
    return this._appConfig.virtualDirectory;
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
  get pageCredits(): string {
    return this._appConfig.pageCredits;
  }
  get allTablesPageSize(): number {
    return this._appConfig.allTablesPageSize;
  }
}
