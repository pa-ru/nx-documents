import { DocumentsGateway } from './documents-gateway';
import { Document } from '@nx-document/model';
import { Controller, Get, Post, UseInterceptors, UploadedFile, Param, Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentEntity } from './document-entity';
import * as uuidGenerator from 'uuid';

import { InMemoryDBService } from '@nestjs-addons/in-memory-db';

@Controller()
export class AppController {

  constructor(private readonly documentService: InMemoryDBService<DocumentEntity>,
    private documentsGateway: DocumentsGateway) { }

  @Get('documents')
  getAll(): Document[] {
    return this.documentService.getAll().map(elem => {
      return { id: elem.uuid.toString(), name: elem.name, uploadTime: elem.uploadTime };
    });
  }

  @Get('documents/:uuid')
  getByUUID(@Param('uuid') uuid: string): Document {
    const document = this.documentService
      .getAll()
      .find(elem => elem.uuid === uuid);

    if (document) {
      return { id: document.uuid, name: document.name, uploadTime: document.uploadTime }
    }
    return null;
  }

  @Post('documents')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file) {
    const id = uuidGenerator.v4();
    this.documentService
      .createAsync({ uuid: id, name: file.originalname, size: file.size, uploadTime: new Date().toLocaleTimeString() })
      .subscribe(elem => {
        setTimeout(() => {
          this.documentsGateway.broadcast({ id: elem.uuid, name: elem.name, uploadTime: elem.uploadTime })
        }, 3000)
      });

    return { id: id, accepted: true };
  }

  @Delete('documents/:uuid')
  remove(@Param('uuid') uuid: string) {
    const document = this.documentService
      .getAll()
      .find(elem => elem.uuid === uuid);
    this.documentService.delete(document.id);

    return { id: uuid, deleted: true };
  }

}
