import { DocumentStoreService } from './../document-store.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nx-document-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent {

  constructor(public documentStore: DocumentStoreService) { }

  onReset() {
    this.documentStore.reset();
  }
}
