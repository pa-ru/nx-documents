import { Document } from '@nx-document/model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'nx-document-viewer-item',
  templateUrl: './viewer-item.component.html',
  styleUrls: ['./viewer-item.component.scss']
})
export class ViewerItemComponent implements OnInit {

  @Input()
  document: Document;

  image: string;

  getImage() {
    return;
  }

  isUploaded(): boolean {
    this.processThumbnail();
    return this.document.uploadTime !== 'n.a.';
  }

  constructor() {

  }

  ngOnInit() {
    this.processThumbnail();
  }

  processThumbnail() {
    if (this.document && this.document.thumbnail) {
      this.image = "data:image/png;base64," + this.document.thumbnail;
    }
  }

}
