import { Document } from '@nx-document/model';
import { InMemoryDBEntity } from "@nestjs-addons/in-memory-db";

export interface DocumentEntity extends Document, InMemoryDBEntity {
   
}