// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export interface IAppConfiguration {
    production: boolean;
    name: string;
    version: string;
    proxy: string | null;
    apiUrl: string;
    httpMaxRetries: number;
    httpRetryDelay: number;
}
