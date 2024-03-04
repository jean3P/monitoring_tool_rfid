// ProcessWSMessage.js

import {UPDATES} from "./constants";
import {fetchTAGDetailsByID} from "../context/ApiService";

/**
 * Processes a WebSocket message by extracting the type and data from the event object,
 * and then calling the appropriate method to fetch the details based on the type.
 *
 * @param {Event} ev - The WebSocket message event containing the type and data.
 * @param {function} handleDataUpdate - The callback function to handle the fetched data.
 * @return {boolean} - Indicates the success of processing the WebSocket message.
 */
export default function processWebsocketMessage(ev, handleDataUpdate) {
    const { type, data } = JSON.parse(ev.data);
    console.log("Parsed type: ", type);
    console.log("Parsed data: ", data);

    if (type === UPDATES.NEW_TAG || type === UPDATES.REDUNDANT_TAG) {
        fetchTAGDetailsByID(data.id, handleDataUpdate, type)
            .catch(error => console.error(`Error fetching details: ${error}`));
    } else {
        console.error(`Unknown update type: ${type}`);
    }

}
