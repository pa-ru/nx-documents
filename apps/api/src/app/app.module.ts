import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DocumentsGateway } from './documents-gateway';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';

@Module({
  imports: [DocumentsGateway, InMemoryDBModule.forRoot()],
  controllers: [AppController],
  providers: [DocumentsGateway],
})
export class AppModule { }
