import {useEffect} from 'react';
import useWebSocket from 'react-use-websocket';
import processWebsocketMessage from "../utils/ProcessWSMessage";
import {MAX_RECONNECT_ATTEMPTS, MAX_TIMEOUT} from "../utils/constants";

function useWebSocketServerStatus(handleDataUpdate, BASE_WS_URL) {
    const WS_URL = `${BASE_WS_URL}/`;

    // Custom hook to manage WebSocket connection
    const { lastMessage} = useWebSocket(WS_URL, {
        shouldReconnect: (closeEvent) => true, // Always attempt to reconnect
        reconnectInterval: MAX_TIMEOUT, // Reconnection attempt interval
        reconnectAttempts: MAX_RECONNECT_ATTEMPTS,
        onOpen: () => console.log('WebSocket Ready'),
    });

    // Effect to listen to the WebSocket's last message
    useEffect(() => {
        if (lastMessage !== null)  {
            console.log('Processing WebSocket message', lastMessage);
            processWebsocketMessage(lastMessage, handleDataUpdate);
        }
    }, [lastMessage, handleDataUpdate]);

}

export default useWebSocketServerStatus;
