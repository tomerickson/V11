import { APP_BASE_HREF } from '@angular/common';
import {
  Inject,
  Injectable,
  InjectionToken,
  StaticProvider
} from '@angular/core';
import { IAppConfig } from './iapp-config.model';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, lastValueFrom, map } from 'rxjs';
import packageJson from '../../../../package.json';

export const APP_CONFIG = new InjectionToken<IAppConfig>('app.config');

export const provideConfigfile = (config: IAppConfig): StaticProvider => {
  return { provide: APP_CONFIG, useValue: config };
};

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
    version: packageJson.version,
    proxy: null,
    apiUrl: '?',
    virtualDirectory: null,
    httpMaxRetries: -1,
    httpRetryDelay: -1,
    pageCredits: '',
    allTablesPageSize: 1
  };

  constructor(
    @Inject(APP_BASE_HREF) private baseUrl: string,
    private http: HttpClient
  ) {
    this.loadConfigFile();
  }

  loadConfigFile = async (): Promise<void> => {
    this._appConfig = await firstValueFrom(
      this.http.get<IAppConfig>('assets/config/config.json')
    );
  };

  validateConfiguration() {
    let ok = this.apiUrl !== '?' && this.pageCredits !== '';
    if (!ok) {
      throw new Error('config.json file is missing or invalid');
    }
    return ok;
  }

  get config(): IAppConfig {
    return this._appConfig;
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
  get proxy(): string | null {
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
