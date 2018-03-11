import { Inject, Service } from 'typedi';
import { ExpressServerImpl } from '../services/ExpressServerImpl';
import { EnvService } from '../services/EnvService';
import { DatabaseServiceImpl } from '../services/DatabaseServiceImpl';
import { createConnection } from 'typeorm';
import { IServer } from '../interfaces/IServer';
import { ILogger } from '../interfaces/ILogger';
import { IDbConfig } from '../interfaces/IDbConfig';
import { Logger } from '../decorators/Logger';

@Service()
export class Application {

  constructor(
    @Inject(ExpressServerImpl) private readonly server: IServer,
    @Inject(DatabaseServiceImpl) private readonly dbService: IDbConfig,
    @Logger() private readonly logger: ILogger,
    private readonly envService: EnvService,
  ) { }

  public readonly start = async () => {
    await createConnection(this.dbService.getDbConfig());
    const port = this.envService.Port;
    this.server.start(port);
    this.logger.info(`Server listening at port ${port}`);
  };
}
