import express from "express";
import router from "./router.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
        openapi: "3.0.0",
    info: {
        title: "Hello!",
        version: "1.0.0",
    },
  },
  apis: ["router.js"],
};

const openapiSpecification = swaggerJsdoc(options);

const app = express();
app.use(express.json());
app.use("/api", router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.listen(3333);

console.log("Running success");