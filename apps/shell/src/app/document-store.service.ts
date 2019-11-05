import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';
import { Observable, BehaviorSubject } from 'rxjs';
import { DocumentMessage, DOCUMENT_WEBSOCKET, Document } from '@nx-document/model';

@Injectable({
  providedIn: 'root'
})
export class DocumentStoreService {

  private readonly SERVER_URL = "http://localhost:3333/api/documents";
  private readonly documentStore = new BehaviorSubject<Document[]>([]);

  readonly documents$ = this.documentStore.asObservable();

  private get documents(): Document[] {
    return this.documentStore.getValue();
  }

  private set documents(val: Document[]) {
    this.documentStore.next(val);
  }

  constructor(private http: HttpClient, private socket: Socket) {
    this.fetchData();

    this.socket
      .fromEvent(DOCUMENT_WEBSOCKET.DOCUMENT_PROCESSED_EVENT_NAME)
      .subscribe((documentMessage: DocumentMessage) => {
        this.http
          .get<Document>(`/api/documents/${documentMessage}`)
          .subscribe(result => {
            this.updateDocument(result);
          });
      });
  }

  private updateDocument(prototype: Document) {
    const document = this.documents.find(elem => elem.id === prototype.id);
    if (document) {
      const index = this.documents.indexOf(document);
      this.documents[index] = prototype;
    }

  }

  private fetchData() {
    this.http.get<Document[]>('/api/documents').subscribe(result => this.documents = result);
  }

  public addDocument(formData) {

    const fileName = (<File>formData.get('file')).name;
    this.http.post(this.SERVER_URL, formData).subscribe(
      (res) => {
        const newItem = { id: (<any>res).id.toString(), name: fileName, uploadTime: 'n.a.' }
        this.documents = [newItem, ...this.documents];

        console.log(JSON.stringify(res));
      },
      (err) => console.log(err)
    );
  }

  public reset() {
    this.documents
      .forEach(elem => this.http
        .delete(`/api/documents/${elem.id}`)
        .subscribe((res) => console.log(res)));
        
    // the hard way: this.fetchData();
    this.documents = [];
  }
}
