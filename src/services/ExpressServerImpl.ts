import { Service, Token } from 'typedi';
import { useExpressServer } from 'routing-controllers';
import { StatsController } from '../controllers/StatsController';
import { IServer } from '../interfaces/IServer';
import { Environment, EnvService } from './EnvService';
import { Logger } from '../decorators/Logger';
import { ILogger } from '../interfaces/ILogger';

import * as expressWinston from 'express-winston';
import * as winston from 'winston';
import * as express from 'express';

export const ExpressServerImpl = new Token<IServer>();

@Service(ExpressServerImpl)
export class ExpressImpl implements IServer {

  private readonly app: express.Express;

  constructor(
    @Logger() private readonly logger: ILogger,
    private readonly envService: EnvService,
  ) {

    this.app = express();

    this.addExpressLoggerMiddleware();

    useExpressServer(this.Instance, {
      controllers: [
        StatsController
      ]
    });
  }

  private readonly addExpressLoggerMiddleware = (): void => {

    this.logger.verbose('Initializing winston logging middleware...');

    if (this.envService.Env === Environment.production) {
      this.Instance.use(expressWinston.errorLogger({
        transports: [
          new winston.transports.Console({
            json: true,
            colorize: true
          })
        ],
        winstonInstance: this.logger.Instance,
      }));
    } else {
      this.Instance.use(expressWinston.logger({
        transports: [
          new winston.transports.Console({
            json: true,
            colorize: true
          })
        ],
        winstonInstance: this.logger.Instance,
      }));
    }
  };

  public readonly start = (port: number): void => {
    this.Instance.listen(port);
  };

  get Instance(): express.Express {
    return this.app;
  }
}
