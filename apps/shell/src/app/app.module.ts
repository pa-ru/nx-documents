import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { SocketIoModule } from 'ngx-socket-io';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    HttpClientModule,
    SocketIoModule.forRoot({
      url:'http://localhost:3333',
      options: {},
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
