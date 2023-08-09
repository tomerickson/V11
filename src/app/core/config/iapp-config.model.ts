export interface IAppConfig {
  readonly production: boolean;
  readonly name: string;
  readonly version: string;
  readonly proxy: string | null;
  readonly apiUrl: string;
  readonly virtualDirectory: string | null;
  /**
   * Number of time to retry an http request
   */
  readonly httpMaxRetries: number;
  /**
   * Delay in milliseconds before initial retry
   *
   * Subsequent retries are delayed by (# of retries * httpRetryDelay)
   *
   */
  readonly httpRetryDelay: number;
}
