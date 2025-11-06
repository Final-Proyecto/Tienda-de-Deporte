declare class DatabaseConnection {
    private static instance;
    private isConnected;
    private constructor();
    static getInstance(): DatabaseConnection;
    connect(uri: string): Promise<void>;
}
export default DatabaseConnection;
