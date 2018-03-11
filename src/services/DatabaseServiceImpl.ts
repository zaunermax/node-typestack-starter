import { Service, Token } from 'typedi';
import { Environment, EnvService } from './EnvService';
import { IDbConfig } from '../interfaces/IDbConfig';
import * as fs from 'fs';
import { ILogger } from '../interfaces/ILogger';
import { Logger } from '../decorators/Logger';

export const DatabaseServiceImpl = new Token<DatabaseService>();

interface IDbFields {
  username: string;
  password: string;
  host: string;
  port: string;
  database: string;
}

interface IDbCredentials {
  development: IDbFields;
  production: IDbFields;
}

@Service(DatabaseServiceImpl)
export class DatabaseService implements IDbConfig {

  private readonly configPath: string;

  constructor(
    @Logger() private readonly logger: ILogger,
    private readonly envService: EnvService
  ) {
    this.configPath = envService.DbConfigPath;
  }

  private readonly getConfigFromFs = (): IDbCredentials => {
    if (fs.existsSync(this.configPath)) return require(this.configPath);
    else throw new Error(`Database config not found in ${this.configPath}. The config file is git ignored.`);
  };

  public readonly getDbConfig = () => {

    const config = this.envService.Env === Environment.development ?
      this.getConfigFromFs().development :
      this.getConfigFromFs().production;

    this.logger.verbose('Initializing database with', config);

    return {
      type: 'mysql',
      synchronize: true,
      logging: false,
      host: config.host,
      port: config.port,
      database: config.database,
      username: config.username,
      password: config.password,
      entities: []
    };
  };
}
