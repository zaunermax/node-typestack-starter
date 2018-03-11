import { Container } from 'typedi';
import { WinstonLoggerImpl } from '../services/WinstonLoggerImpl';

export const Logger = () => (object: object, propertyName: string, index?: number) => {
  const logger = Container.get(WinstonLoggerImpl);
  Container.registerHandler({ object, propertyName, index, value: () => logger });
};
