import { InMemoryDBEntity } from "@nestjs-addons/in-memory-db";

export interface DocumentEntity extends InMemoryDBEntity{
    uuid: string;
    name: string;
    size: number;
}