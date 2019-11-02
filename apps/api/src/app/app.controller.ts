import { Document } from '@nx-document/model';
import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('documents')
  getData() : Document[]{
    return this.appService.getDocuments();
  }
}
