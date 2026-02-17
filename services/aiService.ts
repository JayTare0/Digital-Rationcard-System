
export const aiService = {
    async generateResponse(query: string): Promise<string> {
        try {
            const response = await fetch('/api/ai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error("AI Service API Error:", response.status, response.statusText, errorData);
                if (response.status === 400) return "I couldn't understand that request. Please try asking differently.";
                return "I'm having trouble connecting to the server. Please check if the backend is running.";
            }

            const data = await response.json();
            return data.response;
        } catch (error) {
            console.error("AI Service Error:", error);
            return "I'm having trouble connecting to the server. Please check your internet connection.";
        }
    }
};
