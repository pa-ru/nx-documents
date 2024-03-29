# nx-documents
nx-documents is primarily a coding exercise to evaluate the impacts of websocket-based communication to the frontend and it's architecture.

## Business
On the business-side it' offers the user an async file upload. After uploading a file the ui will show a spinner until the server has done ist timeconsuming work like virus scan or OCR.

## Implementation in a nutshell
nx-documents uses a monorepository ([Nx](https://nx.dev)) solution for Frontendend- ([Angular](https://angular.io)) 
and Backend-Development ([NestJS])(https://nestjs.com/).

The synchronous communication is based on RESTfull http (FileUpload, Resource-handling). The server-triggered notification that the file is processed uses websockets ([socket-io](https://socket.io/) and [ngx-socket-io](https://github.com/rodgc/ngx-socket-io))

## Running and coding 

Run `ng serve` **and** `ng serve api` to start front- and backend.
Navigate to http://localhost:4200/ to view the frontend.

When coding the apps will automatically reload if you change and save any of the source files.


## Debuggin
### frontend
Use your favorite browsers developer tools or attach an IDE of your choice
### backend
#### VSCode
* execute `ng serve api` to start the backend
* go to debug section and hit the play button (label must be 'attach to api')