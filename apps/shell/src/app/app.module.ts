import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { SocketIoModule } from 'ngx-socket-io';
import { UploadComponent } from './upload/upload.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewerComponent } from './viewer/viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    ViewerComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    HttpClientModule,
    SocketIoModule.forRoot({
      url: 'http://localhost:3333',
      options: {},
    }),
    ReactiveFormsModule,
    ScrollingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
