import { DocumentStoreService } from './../document-store.service';
import { Component } from '@angular/core';

@Component({
  selector: 'nx-document-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent {

  constructor(public documentStore: DocumentStoreService) { }

  onReset() {
    this.documentStore.reset();
  }
}
