import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Document, DocumentMessage, DOCUMENT_WEBSOCKET } from '@nx-document/model';
import { Socket } from 'ngx-socket-io';
import { Server } from 'net';


class ServerMessage {
  timestamp: string;
  message: DocumentMessage;
}

@Component({
  selector: 'nx-document-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'shell';

  $documents: Observable<Document[]>;

  messages: Array<ServerMessage> = new Array();

  constructor(http: HttpClient, private socket: Socket) {
    this.$documents = http.get<Document[]>('/api/documents');
  }

  receiveUpdates(): Observable<DocumentMessage> {
    this.socket.emit(DOCUMENT_WEBSOCKET.DOCUMENT_PROCESSED_EVENT_NAME);
    return this.socket.fromEvent(DOCUMENT_WEBSOCKET.DOCUMENT_PROCESSED_EVENT_NAME);
  }

  ngOnInit() {

    this.receiveUpdates().subscribe((documentMessage: DocumentMessage) => {
      this.messages.push({ timestamp: new Date().toLocaleTimeString(), message: documentMessage });
      console.log(documentMessage);
    });
  }

}
