import { Document } from '@nx-document/model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'nx-document-viewer-item',
  templateUrl: './viewer-item.component.html',
  styleUrls: ['./viewer-item.component.css']
})
export class ViewerItemComponent implements OnInit {

  @Input()
  document: Document;

  isUploaded():boolean{
    return this.document.uploadTime !== 'n.a.';
  }

  constructor() { }

  ngOnInit() {
  }

}
