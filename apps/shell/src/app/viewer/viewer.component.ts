import { DocumentStoreService } from './../document-store.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nx-document-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit {

  constructor(public documentStore: DocumentStoreService) { }

  ngOnInit() {

  }
}
