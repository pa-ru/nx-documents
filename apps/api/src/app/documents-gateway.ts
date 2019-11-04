import { Document, DOCUMENT_WEBSOCKET } from '@nx-document/model';
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class DocumentsGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() server: Server;

    views: number = 0;

    async handleConnection() {
        this.views++;
        this.server.emit('views', this.views);
    }

    async handleDisconnect() {
        this.views--;
        this.server.emit('views', this.views);
    }

    @SubscribeMessage(DOCUMENT_WEBSOCKET.DOCUMENT_PROCESSED_EVENT_NAME)
    handleDocuments(data: Document): string {
        return data.id;
    }

    public broadcast(document: Document) {
        this.server.emit(DOCUMENT_WEBSOCKET.DOCUMENT_PROCESSED_EVENT_NAME, document.id)
    }

    // @SubscribeMessage(DOCUMENT_WEBSOCKET.DOCUMENT_PROCESSED_EVENT_NAME)
    // handleDocuments(client: Client, data: Document): Observable<WsResponse<DocumentMessage>> {
    //     return data.id;

    //     return interval(1000)
    //         .pipe(
    //             concatMap((number) => {
    //                 return of(
    //                     { event: DOCUMENT_WEBSOCKET.DOCUMENT_PROCESSED_EVENT_NAME, data: { title: 'invoice ' + number } }
    //                 )
    //                     .pipe(
    //                         delay(Math.floor(Math.random() * (1 + 1000 - 5000)) + 1000))
    //                     );
    //             })
    //         );
    // }
}

// export const mockData: DocumentMessage[] = [
//     {
//         title: 'invoice 17',
//     },
//     {
//         title: 'donation receipt 87',
//     },
//     {
//         title: 'unknown document type',
//     },
// ];
