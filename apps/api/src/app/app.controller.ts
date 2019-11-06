import { DocumentsGateway } from './documents-gateway';
import { Document } from '@nx-document/model';
import { Controller, Get, Post, UseInterceptors, UploadedFile, Param, Delete, ClassSerializerInterceptor } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentEntity } from './document-entity';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import * as sharpThumbnailer from 'sharp';

@Controller()
export class AppController {

  constructor(private readonly documentService: InMemoryDBService<DocumentEntity>,
    private documentsGateway: DocumentsGateway) { }

  @Get('documents')
  getAll(): Document[] {
    return this.documentService.getAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('documents/:id')
  getById(@Param('id') id: number): Document {
    return this.documentService.get(id);
  }

  @Post('documents')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file) {
    const nextId = this.nextId();
    let document: DocumentEntity = { id: nextId, name: file.originalname, size: file.size, uploadTime: new Date().toLocaleTimeString() };

    this.documentService
      .createAsync(document)
      .subscribe(() => {
        setTimeout(() => {
          sharpThumbnailer(file.buffer)
            .resize(30)
            .toBuffer()
            .then((thumbnail) => {
              document = {
                ...document,
                thumbnail: thumbnail.toString('base64')
              };
              this.documentService.update(document);
              this.documentsGateway.broadcast(document);
            })
            .catch((err) => {
              // also notifiy the client, a thumbnail is optional...
              this.documentsGateway.broadcast(document);
              console.error(err);
            });
        }, 2000)
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
