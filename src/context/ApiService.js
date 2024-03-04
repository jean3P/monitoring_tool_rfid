// ApiService.js

import {BASE_API_URL} from "../utils/constants";

/**
 * Fetches TAG details by ID from the API and updates the tag.
 *
 * @param {string} id - The ID of the TAG to fetch details for.
 * @param {function} updateTag - The function to update the tag with the fetched details.
 * @param {string} type - The type of the tag.
 * @returns {Promise} - A promise that resolves when the details have been fetched and the tag has been updated.
 * @throws {Error} - If there was an error fetching the details.
 */
export const fetchTAGDetailsByID = async (id, updateTag, type) => {
    try {
        const response = await fetch(`${BASE_API_URL}/arduino-data/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        const nodeData = await response.json();
        updateTag(type, nodeData);
    } catch (error) {
        console.error(`Error fetching details for TAG with ID: ${id}:`, error);
        throw error;
    }
};


/**
 * Clears the database by sending a POST request to the clean-database endpoint.
 *
 * @returns {Promise<boolean>} - A Promise that resolves to true if the database is cleared successfully, or false otherwise.
 */
export const fetchClearDatabase = async () => {
    try {
        const response = await fetch(`${BASE_API_URL}/clean-database/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        console.log("Database cleared successfully");
        return true; // Return true to indicate success
    } catch (error) {
        console.error("Failed to clear the database:", error);
        return false; // Return false to indicate failure
    }
};
