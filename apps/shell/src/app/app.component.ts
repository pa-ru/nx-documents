import { Component, OnInit } from '@angular/core';
import { DocumentMessage } from '@nx-document/model';

class ServerMessage {
  timestamp: string;
  message: DocumentMessage;
}
@Component({
  selector: 'nx-document-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'shell';
}
