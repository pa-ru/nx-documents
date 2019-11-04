import { Document } from '@nx-document/model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'nx-document-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  @Output() fileUploaded: EventEmitter<Document> = new EventEmitter();

  SERVER_URL = "http://localhost:3333/api/documents";
  uploadForm: FormGroup;

  chosenFile = 'Choose File';

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient) { }

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.chosenFile = file.name;
      this.uploadForm.get('profile').setValue(file);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('profile').value);

    this.httpClient.post(this.SERVER_URL, formData).subscribe(
      (res) => {
        this.fileUploaded.emit({ id: (<any>res).id.toString(), name: 'n.a.', uploadTime: 'n.a.' });
        console.log(res)
      },
      (err) => console.log(err)
    );
  }
}
