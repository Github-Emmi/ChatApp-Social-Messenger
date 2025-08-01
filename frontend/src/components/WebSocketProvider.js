import ReconnectingWebSocket from 'reconnecting-websocket';

const timelineSocket = new ReconnectingWebSocket(`${process.env.REACT_APP_WS_URL}/timeline/`);
const notificationSocket = new ReconnectingWebSocket(`${process.env.REACT_APP_WS_URL}/notifications/`);

export { timelineSocket, notificationSocket };
