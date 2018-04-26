import { Inject, Service } from 'typedi';
import { ExpressServerImpl } from '../services/ExpressServerImpl';
import { EnvService } from '../services/EnvService';
import { IServer } from '../interfaces/IServer';
import { ILogger } from '../interfaces/ILogger';
import { Logger } from '../decorators/Logger';

@Service()
export class Application {

  constructor(
    @Inject(ExpressServerImpl) private readonly server: IServer,
    @Logger() private readonly logger: ILogger,
    private readonly envService: EnvService,
  ) { }

  public readonly start = () => {
    const port = this.envService.Port;
    this.server.start(port);
    this.logger.info(`Server listening at port ${port}`);
    this.logger.info(`App running in [${this.envService.Env}] mode`);
  };
}
