import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Document } from '@nx-document/model';

@Component({
  selector: 'nx-document-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'shell';
 
  documents: Observable<Document[]>;

  constructor(http: HttpClient) {
    this.documents = http.get<Document[]>('/api/documents');
  }
}
