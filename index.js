import express from "express";
import router from "./router.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import cookieParser from "cookie-parser";

import * as path from "@std/path";

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Hello!",
			version: "1.0.0",
		},
		servers: [{ url: "/api" }],
		components: {
			securitySchemes: {
				oauth2: {
					type: "oauth2",
					flows: {
						password: {
							tokenUrl: "/api/auth/login",
						},
					},
				},
				bearerAuth: {
					type: "http",
					scheme: "bearer",
					bearerFormat: "JWT",
				},
			},
		},
		security: {
			bearerAuth: [],
		},
	},
	apis: ["router.js"],
};

const openapiSpecification = swaggerJsdoc(options);
const dirname = path.dirname(path.fromFileUrl(import.meta.url));

const app = express();
app.use(express.json());
app.use(cookieParser());

// Back-end API routes
app.use("/api", router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use("/uploads", express.static("uploads"));

// Front-end Distrubution root route
app.use(express.static(path.join(dirname, "dist")));

// Front-end Distrubution routes
app.use((_req, res) => res.sendFile(path.join(dirname, "dist/index.html")));

// Server Port
app.listen(Deno.env.get("PORT"));

console.log("Running success");

/*
function errorHandler(err, req, res, next) {
	if (err.code == "LIMIT_FILE_SIZE") {
		res.json({
			secces: false,
			message: "too large"
		})
	}
}
*/
