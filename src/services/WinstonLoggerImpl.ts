import { Service } from 'typedi';
import { Environment, EnvService } from './EnvService';
import * as winston from 'winston';
import { ILogger } from '../interfaces/ILogger';

export enum LogLevel {
  debug = 'debug',
  info = 'info',
}

@Service()
export class WinstonLoggerImpl implements ILogger {

  private readonly logger = new winston.Logger();

  constructor(private readonly envService: EnvService) {

    const isDevelopment = this.envService.Env === Environment.development;

    this.logger.add(winston.transports.Console, {
      timestamp: WinstonLoggerImpl.formatNow,
      type: 'verbose',
      colorize: true,
      prettyPrint: true,
      handleExceptions: true,
      humanReadableUnhandledException: true,
      level: isDevelopment ? LogLevel.debug : LogLevel.info,
    });
  }

  private static readonly formatDoubleDigits = (val: number) => {
    return ('0' + val).slice(-2);
  };

  private static readonly formatNow = () => {
    const now = new Date();

    const formattedTime =
      WinstonLoggerImpl.formatDoubleDigits(now.getHours()) + ':' +
      WinstonLoggerImpl.formatDoubleDigits(now.getMinutes()) + ':' +
      WinstonLoggerImpl.formatDoubleDigits(now.getSeconds()) + ':' +
      WinstonLoggerImpl.formatDoubleDigits(now.getMilliseconds());

    return `[${formattedTime}]`;
  };

  public readonly info = (...args: any[]) => {
    this.Instance.info.apply(null, args);
  };

  public readonly warn = (...args: any[]) => {
    this.Instance.warn.apply(null, args);
  };

  public readonly error = (...args: any[]) => {
    this.Instance.error.apply(null, args);
  };

  public readonly debug = (...args: any[]) => {
    this.Instance.debug.apply(null, args);
  };

  public readonly verbose = (...args: any[]) => {
    this.Instance.verbose.apply(null, args);
  };

  get Instance(): winston.LoggerInstance {
    return this.logger;
  }
}
