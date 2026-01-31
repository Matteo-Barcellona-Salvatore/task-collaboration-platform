import { Injectable } from '@angular/core';
import { Client, StompConfig, IFrame, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private client: Client;
  private connected = new BehaviorSubject<boolean>(false);
  public connected$ = this.connected.asObservable();

  private taskUpdatesSubject = new BehaviorSubject<any>(null);
  public taskUpdates$ = this.taskUpdatesSubject.asObservable();

  private notificationsSubject = new BehaviorSubject<any>(null);
  public notifications$ = this.notificationsSubject.asObservable();

  constructor() {
    this.client = new Client();
  }

  connect(): void {
    const stompConfig: StompConfig = {
      webSocketFactory: () => {
        return new SockJS(environment.wsUrl) as WebSocket;
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log('WebSocket connected');
        this.connected.next(true);
        this.subscribeToTopics();
      },
      onDisconnect: () => {
        console.log('WebSocket disconnected');
        this.connected.next(false);
      },
      onStompError: (frame: IFrame) => {
        console.error('WebSocket error:', frame);
      }
    };

    this.client.configure(stompConfig);
    this.client.activate();
  }

  private subscribeToTopics(): void {
    this.client.subscribe('/topic/tasks', (message: IMessage) => {
      const taskUpdate = JSON.parse(message.body);
      this.taskUpdatesSubject.next(taskUpdate);
    });

    this.client.subscribe('/topic/notifications', (message: IMessage) => {
      const notification = JSON.parse(message.body);
      this.notificationsSubject.next(notification);
    });
  }

  sendTaskUpdate(task: any): void {
    if (this.client.connected) {
      this.client.publish({
        destination: '/app/task-update',
        body: JSON.stringify(task)
      });
    }
  }

  sendNotification(notification: any): void {
    if (this.client.connected) {
      this.client.publish({
        destination: '/app/notification',
        body: JSON.stringify(notification)
      });
    }
  }

  disconnect(): void {
    if (this.client) {
      this.client.deactivate();
    }
  }
}