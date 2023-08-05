export interface IAppConfiguration {
    production: boolean;
    name: string;
    version: string;
    proxy: string | null;
    apiUrl: string;
    httpMaxRetries: number;
    httpRetryDelay: number;
    pageCredits: string;
}
