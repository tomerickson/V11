export interface IAppConfiguration {
    production: boolean;
    name: string;
    version: string;
    proxy: string | null;
    apiUrl: string;
    virtualDirectory: string | null;
    httpMaxRetries: number;
    httpRetryDelay: number;
    pageCredits: string;
}
