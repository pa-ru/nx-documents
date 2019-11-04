import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocumentsGateway } from './documents-gateway';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';

@Module({
  imports: [DocumentsGateway, InMemoryDBModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, DocumentsGateway],
})
export class AppModule {}
