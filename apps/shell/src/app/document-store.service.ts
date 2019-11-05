import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { DocumentMessage, DOCUMENT_WEBSOCKET, Document } from '@nx-document/model';

@Injectable({
  providedIn: 'root'
})
export class DocumentStoreService {

  SERVER_URL = "http://localhost:3333/api/documents";

  documents: Document[];

  constructor(private http: HttpClient, private socket: Socket) {
    this.getAll();
    this.receiveUpdates().subscribe((documentMessage: DocumentMessage) => {
      this.http
        .get<Document>(`/api/documents/${documentMessage}`)
        .subscribe(result => {
          const index = this.documents.findIndex(elem => elem.id === result.id);
          if (index) {
            this.documents[index] = result;
          }
        });
    });
  }

  getAll() {
    this.http.get<Document[]>('/api/documents').subscribe(result => this.documents = result);
  }

  receiveUpdates(): Observable<DocumentMessage> {
    this.socket.emit(DOCUMENT_WEBSOCKET.DOCUMENT_PROCESSED_EVENT_NAME);
    return this.socket.fromEvent(DOCUMENT_WEBSOCKET.DOCUMENT_PROCESSED_EVENT_NAME);
  }

  addDocument(formData) {

    const fileName = (<File>formData.get('file')).name;
    this.http.post(this.SERVER_URL, formData).subscribe(	
      (res) => {	
       this.documents.push({ id: (<any>res).id.toString(), name: fileName, uploadTime: 'n.a.' })
        console.log(JSON.stringify(res));	
      },	
      (err) => console.log(err)
    );
  }
}
