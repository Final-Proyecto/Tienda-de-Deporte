import app from "./app.js";
import config from "./core/config/index.js";
import DatabaseConnection from "./core/database/database.js";
async function main() {
    const db = DatabaseConnection.getInstance();
    await db.connect(config.mongoUri);
    app.listen(config.port, () => {
        console.log(`🚀 Servidor corriendo en http://localhost:${config.port}`);
    });
}
main().catch(console.error);
//# sourceMappingURL=server.js.map