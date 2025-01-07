const BASEURL = 'https://unidos-todos.com';
const AUTHTOKEN = 'bb944474-816d-469e-9aa9-4a56809ee19b';

export default class CalendarService {
    /**
     * Fetch events from the server
     * @returns {Promise<Array>} - Resolves to an array of event objects
     */
    async getEvents() {
        try {
        const url = new URL(`${BASEURL}/events`);

        const response = await fetch(url.toString(), {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            "Cookie": `authToken=${AUTHTOKEN}`,
            },
        });
    
        if (!response.ok) {
            throw new Error(`Error fetching events: ${response.statusText}`);
        }
    
        const data = await response.json();
        return data; // Assume the server returns an array of events
        } catch (error) {
        console.error("Error in getEvents:", error);
        throw error;
        }
    }
    
    /**
     * Add a new event to the server
     * @param {Object} eventData - Event data to create (e.g., { date, time, studentId, confirmed })
     * @returns {Promise<Object>} - Resolves to the created event object
     */
    async addEvent(eventData) {
        try {
        const response = await fetch(`${BASEURL}/events`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(eventData),
        });
    
        if (!response.ok) {
            throw new Error(`Error adding event: ${response.statusText}`);
        }
    
        const data = await response.json();
        return data; // Assume the server returns the created event object
        } catch (error) {
        console.error("Error in addEvent:", error);
        throw error;
        }
    }
}
    