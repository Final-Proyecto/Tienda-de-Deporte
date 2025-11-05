export default {
  port: parseInt(process.env.PORT || "3000", 10),
  mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/tienda-deporte",
  jwtSecret: process.env.JWT_SECRET || "mi-secreto-seguro",
};
