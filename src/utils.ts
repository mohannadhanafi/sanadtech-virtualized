export async function getUsernames(): Promise<string[]> {
    try {
        const response = await fetch('/usernames.txt');
        const text = await response.text();
        const usernames = text.split('\n');
        return usernames;
    } catch (error) {
        console.error('Error reading usernames:', error);
        return [];
    }
}
