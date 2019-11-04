import { Document } from '@nx-document/model';
import { Injectable } from '@nestjs/common';

export interface Todo {
  title: string;
}

@Injectable()
export class AppService {
  getDocuments(): Document[] {
    return [{ title: 'invoice', id: '1' }, { title: 'donation receipt', id: '2' }];
  }
}