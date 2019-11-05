import { InMemoryDBEntity } from "@nestjs-addons/in-memory-db";

export interface DocumentEntity extends InMemoryDBEntity {
    name: string;
    size: number;
    uploadTime: string;
}