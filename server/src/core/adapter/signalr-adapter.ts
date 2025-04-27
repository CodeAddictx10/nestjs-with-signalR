/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { INestApplicationContext, Logger } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import * as signalR from '@microsoft/signalr';

export class SignalRIoAdapter extends IoAdapter {
  private readonly logger = new Logger(SignalRIoAdapter.name);
  private signalRHub: any;
  private serverUrl: string;

  constructor(private app: INestApplicationContext) {
    super(app);
    this.serverUrl = process.env.SIGNALR_SERVER_URL!;
    if (!this.serverUrl) {
      throw new Error('SignalR server url is not set');
    }
  }

  createIOServer(port: number, options?: any): any {
    // Initialize SignalR Hub
    const hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${this.serverUrl}/hub`)
      .withAutomaticReconnect([5000, 10000, 60000, 600000])
      .configureLogging(signalR.LogLevel.Information)
      .build();

    // Start the connection
    hubConnection
      .start()
      .then(() => {
        this.logger.log('SignalR Hub started successfully');
      })
      .catch((err) => {
        this.logger.error('Failed to start SignalR Hub', err);
      });
    this.signalRHub = hubConnection;

    // Create a proxy object that will be used in place of the Socket.IO server
    const signalRServer = {
      // This stores all the event handlers
      eventHandlers: {},

      // Method to register an event handler
      on: (event: string, callback: Function) => {
        this.logger.log(`Registering handler for event: ${event}`);
        signalRServer.eventHandlers[event] = callback;

        // Register the method on the SignalR hub
        hubConnection.on(event, (data: any) => {
          callback(data);
        });
      },
      // Method to emit an event
      emit: (event: string, ...args: any[]) => {
        if (hubConnection.state === signalR.HubConnectionState.Connected) {
          return hubConnection.invoke(event, ...args);
        } else {
          this.logger.warn(
            `Cannot emit event ${event}: SignalR not connected (state: ${hubConnection.state})`,
          );
        }
      },

      // Close connection
      close: () => {
        return hubConnection.stop();
      },
    };

    return signalRServer;
  }

  bindClientConnect(server: any, callback: Function) {
    server.on('connection', callback);

    // If using SignalR, we need to simulate the connection event
    if (this.signalRHub) {
      this.signalRHub.onreconnected(() => {
        this.logger.log('Client reconnected');
        callback(this.signalRHub);
      });

      // Simulate initial connection
      callback(this.signalRHub);
    }
  }

  bindClientDisconnect(client: any, callback: Function) {
    if (client && client.onclose) {
      client.onclose(callback);
    } else if (this.signalRHub) {
      this.signalRHub.onclose(callback);
    }
  }
}
