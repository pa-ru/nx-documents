import { TestingModule } from '@nestjs/testing';
import { Document, DocumentMessage, DOCUMENT_WEBSOCKET } from '@nx-document/model';
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Client, Server } from 'socket.io';
import { from, Observable, of, interval } from 'rxjs';
import { concatMap, delay, map } from 'rxjs/operators';

function randomDelay(bottom, top) {
    return Math.floor(Math.random() * (1 + top - bottom)) + bottom;
}

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
    handleLiveticker(client: Client, data: unknown): Observable<WsResponse<DocumentMessage>> {
        return interval(1000)
            .pipe(
                concatMap((number) => {
                    return of(
                        { event: DOCUMENT_WEBSOCKET.DOCUMENT_PROCESSED_EVENT_NAME, data: { title: 'invoice ' + number } }
                    )
                        .pipe(
                            delay(randomDelay(1000, 5000))
                        );
                })
            );
    }
}

export const mockData: DocumentMessage[] = [
    {
        title: 'invoice 17',
    },
    {
        title: 'donation receipt 87',
    },
    {
        title: 'unknown document type',
    },
];
