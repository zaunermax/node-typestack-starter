import { Get, JsonController } from 'routing-controllers';
import { Logger } from '../decorators/Logger';
import { ILogger } from '../interfaces/ILogger';

@JsonController('/stats')
export class StatsController {

  @Logger()
  private readonly logger: ILogger;

  @Get('/')
  public readonly getStats = () => {
    return { foo: 'bar' };
  }
}
