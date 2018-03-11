import 'reflect-metadata';
import { Container } from 'typedi';
import { useContainer as useContainerOrm } from 'typeorm';
import { useContainer } from 'routing-controllers';
import { Application } from './config/Application';

useContainer(Container);
useContainerOrm(Container);

Container.get(Application).start().catch(console.error);
