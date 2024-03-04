// App.js
import React, { useState } from 'react';
import './App.css';
import useWebSocketServerStatus from './hooks/useWebSocketServerStatus';
import { fetchClearDatabase } from './context/ApiService';
import { BASE_WS_URL, UPDATES } from './utils/constants';
import TagList from './components/TagList';

function App() {
    const [tags, setTags] = useState([]);

    /**
     * Handles data update based on the given type and node data.
     *
     * @param {string} type - The type of data update (UPDATES.NEW_TAG or UPDATES.REDUNDANT_TAG).
     * @param {Object} nodeData - The updated node data.
     */
    const handleDataUpdate = (type, nodeData) => {
        if (type === UPDATES.NEW_TAG || type === UPDATES.REDUNDANT_TAG) {
            setTags(prevTags => {
                if (prevTags.find(tag => tag.id === nodeData.id)) {
                    return prevTags;
                }
                return [...prevTags, nodeData];
            });
        }
    };

    useWebSocketServerStatus(handleDataUpdate, BASE_WS_URL);

    /**
     * Clears the database.
     */
    const clearDatabase = async () => {
        const isConfirmed = window.confirm("Are you sure you want to clear the database? This action cannot be undone.");
        if (!isConfirmed) {
            return;
        }

        const success = await fetchClearDatabase(); // Ensure this function is correctly implemented to return a success status
        if (success) {
            setTags([]);
            alert("Database has been cleared successfully.");
        } else {
            alert("Failed to clear the database. Check the console for more information.");
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>RFID Tags List</h1>
                <button onClick={clearDatabase} className="clear-database-btn">Clear Database</button>
            </header>
            <main>
                <TagList tags={tags} />
            </main>
        </div>
    );
}

export default App;
