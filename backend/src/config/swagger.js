const swaggerJsdoc = require("swagger-jsdoc");

const serverUrl =
  process.env.NODE_ENV === "production"
    ? "https://makeup-live.onrender.com"
    : `http://localhost:${process.env.PORT || 4000}`;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Makeup Live API",
      version: "1.0.0",
      description: "API documentation for Makeup Live academic full-stack project"
    },
    servers: [
      {
        url: serverUrl,
        description:
          process.env.NODE_ENV === "production"
            ? "Production server"
            : "Local server"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      },
      schemas: {
        RegisterRequest: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: { type: "string", example: "Luna Perez" },
            email: { type: "string", example: "luna@example.com" },
            password: { type: "string", example: "password123" },
            skin_type: { type: "string", example: "normal" }
          }
        },
        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", example: "luna@example.com" },
            password: { type: "string", example: "password123" }
          }
        },
        FavoriteRequest: {
          type: "object",
          required: ["entity_type", "entity_id"],
          properties: {
            entity_type: {
              type: "string",
              enum: ["product", "tutorial"],
              example: "product"
            },
            entity_id: { type: "integer", example: 1 }
          }
        },
        MessageRequest: {
          type: "object",
          required: ["live_session_id", "content"],
          properties: {
            live_session_id: { type: "integer", example: 1 },
            content: { type: "string", example: "What lipstick shade is that?" }
          }
        }
      }
    }
  },
  apis: ["./src/routes/*.js"]
};

module.exports = swaggerJsdoc(options);
