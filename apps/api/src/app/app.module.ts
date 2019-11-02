import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocumentsGateway } from './documents-gateway';

@Module({
  imports: [DocumentsGateway],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
