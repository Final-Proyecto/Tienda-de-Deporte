import mongoose from "mongoose";

class DatabaseConnection {
  private static instance: DatabaseConnection;
  private isConnected = false;

  private constructor() {}

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  async connect(uri: string): Promise<void> {
    if (this.isConnected) return;
    await mongoose.connect(uri);
    this.isConnected = true;
    console.log("🟢 MongoDB conectado");
  }
}

export default DatabaseConnection;
