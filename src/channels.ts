import { App } from './app.interface';

export enum ChannelGroup {
  ANONYMOUS = 'anonymous',
  AUTHENTICATED = 'authenticated',
  NOTIFICATION = 'notification',
  WORKSPACE = 'workspace',
}

export default function (app: App) {
  if (typeof app.channel !== 'function') {
    // If no real-time functionality has been configured just return
    return;
  }

  app.on('connection', (connection: any) => {
    // On a new real-time connection, add it to the anonymous channel
    app.channel(ChannelGroup.ANONYMOUS).join(connection);
  });

  app.on('login', (authResult: any, { connection }: any) => {
    // connection can be undefined if there is no
    // real-time connection, e.g. when logging in via REST
    if (connection) {
      // The connection is no longer anonymous, remove it
      app.channel(ChannelGroup.ANONYMOUS).leave(connection);

      // Add it to the authenticated user channel and notification channel
      app.channel(ChannelGroup.AUTHENTICATED).join(connection);
      app.channel(`${ChannelGroup.NOTIFICATION}/${connection.user._id || connection.user.id}`).join(connection);
    }
  });

  app.on('logout', (authResult: any, { connection }: any) => {
    if (connection) {
      // Leave all channels before joining anonymous channel.
      app.channel(app.channels).leave(connection);
      app.channel(ChannelGroup.ANONYMOUS).join(connection);
    }
  });

  app.publish(() => app.channel(ChannelGroup.AUTHENTICATED));
}
