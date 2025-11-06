import dotenv from "dotenv";
dotenv.config();
export default {
    port: parseInt(process.env.PORT || "4000"),
    mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/tienda-deporte",
    jwtSecret: process.env.JWT_SECRET || "mi-secreto-seguro",
};
//# sourceMappingURL=index.js.map