import { Service } from 'typedi';
import * as path from 'path';

export enum Environment {
  development = 'development',
  production = 'production',
}

@Service()
export class EnvService {

  private readonly env = process.env.NODE_ENV || Environment.development;
  private readonly port = process.env.APP_PORT || 8080;
  private readonly dbConfigPath = process.env.DB_CONFIG_PATH || '/dbConfig.json';

  get Env(): string {
    return this.env;
  }

  get Port(): number {
    return Number(this.port);
  }

  get DbConfigPath(): string {
    return path.resolve(process.cwd() + this.dbConfigPath);
  }
}
