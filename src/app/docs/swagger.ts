import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.3",

    info: {
      title: "GearUp Rental Marketplace API",
      version: "1.0.0",
      description:
        "REST API for GearUp Rental Marketplace built with Express.js, TypeScript, Prisma, PostgreSQL and Stripe.",
    },

    servers: [
      {
        url: "http://localhost:5000/api",
        description: "Development Server",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: [
    "./src/app/docs/*.ts",
  ],
};

export const swaggerSpec = swaggerJsdoc(options);