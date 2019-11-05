import { DocumentsGateway } from './documents-gateway';
import { Document } from '@nx-document/model';
import { Controller, Get, Post, UseInterceptors, UploadedFile, Param, Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentEntity } from './document-entity';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';

@Controller()
export class AppController {

  constructor(private readonly documentService: InMemoryDBService<DocumentEntity>,
    private documentsGateway: DocumentsGateway) { }

  @Get('documents')
  getAll(): Document[] {
    return this.documentService.getAll().map(elem => {
      return { id: elem.id, name: elem.name, uploadTime: elem.uploadTime };
    });
  }

  @Get('documents/:id')
  getById(@Param('id') id: number): Document {
    const document = this.documentService.get(id);

    if (document) {
      return { id: document.id, name: document.name, uploadTime: document.uploadTime }
    }
    return null;
  }

  @Post('documents')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file) {
    const nextId = this.nextId();

    this.documentService
      .createAsync({ id: nextId, name: file.originalname, size: file.size, uploadTime: new Date().toLocaleTimeString() })
      .subscribe(elem => {
        setTimeout(() => {
          this.documentsGateway.broadcast({ id: elem.id, name: elem.name, uploadTime: elem.uploadTime })
        }, 3000)
      });

    return { id: nextId, accepted: true };
  }

  private nextId() {
    let nextId = 0;

    this.documentService
      .getAll()
      .forEach(val => {
        if (val.id >= nextId) {
          nextId = val.id;
        }
      });
    return nextId + 1;
  }

  @Delete('documents/:id')
  remove(@Param('id') id: number) {
    const document = this.documentService.delete(id);
    return { id: id, deleted: true };
  }

}
