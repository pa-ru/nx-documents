import { Document, DOCUMENT_WEBSOCKET } from '@nx-document/model';
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway()
export class DocumentsGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() server: Server;

    views = 0;

    async handleConnection() {
        this.views++;
        this.server.emit('views', this.views);
    }

    async handleDisconnect() {
        this.views--;
        this.server.emit('views', this.views);
    }

    public broadcast(document: Document) {
        this.server.emit(DOCUMENT_WEBSOCKET.DOCUMENT_PROCESSED_EVENT_NAME, document)
    }
}  