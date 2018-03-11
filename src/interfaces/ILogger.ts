export type LogCallback = (error?: any, level?: string, msg?: string, meta?: any) => void;
export interface ILogMethod {
  (msg: string, callback: LogCallback): void;
  (msg: string, meta: any, callback: LogCallback): void;
  (msg: string, ...meta: any[]): void;
}

export interface ILogger {
  Instance;
  info: ILogMethod;
  error: ILogMethod;
  warn: ILogMethod;
  debug: ILogMethod;
  verbose: ILogMethod;
}
