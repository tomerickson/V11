import { InjectionToken } from "@angular/core"
import { IAppConfig } from "./app/core/config/iapp-config.model"

export class AppConfig implements IAppConfig{
    readonly production!: boolean;
    readonly name!: string;
    version!: string;
    readonly proxy!: string | null;
    readonly apiUrl!: string;
    readonly virtualDirectory!: string | null;
    readonly httpMaxRetries!: number;
    readonly httpRetryDelay!: number;
    readonly pageCredits!: string;
    readonly allTablesPageSize!: number;
  }
   
  export let APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG')