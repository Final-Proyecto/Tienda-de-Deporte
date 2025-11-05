import mongoose from "mongoose";
class DatabaseConnection {
    static instance;
    isConnected = false;
    constructor() { }
    static getInstance() {
        if (!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection();
        }
        return DatabaseConnection.instance;
    }
    async connect(uri) {
        if (this.isConnected)
            return;
        await mongoose.connect(uri);
        this.isConnected = true;
        console.log("🟢 MongoDB conectado");
    }
}
export default DatabaseConnection;
//# sourceMappingURL=database.js.map