import { DocumentsGateway } from './documents-gateway';
import { Document } from '@nx-document/model';
import { Controller, Get, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentEntity } from './document-entity';
import * as uuid from 'uuid';

import { AppService } from './app.service';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService,
    private readonly documentService: InMemoryDBService<DocumentEntity>,
    private documentsGateway: DocumentsGateway) { }

  @Get('documents')
  getData(): Document[] {
    return this.documentService.getAll().map(elem => {
      return { id: elem.uuid.toString(), title: elem.name };
    });
  }

  @Post('documents')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file): string {
    console.log(file);
    let id = uuid.v4();

    this.documentService
      .createAsync({ uuid: id, name: file.originalname, size: file.size })
      .subscribe(elem => {
        console.log(elem);
        return this.documentsGateway.broadcast({ id: elem.uuid, title: elem.name })
      }
      );
    return id;
  }
}
