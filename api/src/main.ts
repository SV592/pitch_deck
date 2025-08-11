import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import session from "express-session";
import passport from "passport";
import { NextFunction, Request, Response } from "express";

/**
 * Main entry point of the NestJS application.
 * This function bootstraps the application, configures middleware, and starts the server.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  });

  app.use((req: Request, res: Response, next: NextFunction) => {
    next();
  });

  // Enable CORS (Cross-Origin Resource Sharing) for frontend communication.
  // Configures allowed origin and credentials handling.
  app.enableCors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  });

  // Session configuration using express-session.
  // This is used for session-based authentication, typically with Passport.
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "your-secret-key", // Secret for signing the session ID cookie.
      resave: false, // Don't save session if unmodified.
      saveUninitialized: false, // Don't save new sessions that have not been modified.
      proxy: true, // Enable proxy support for secure cookies in production behind a proxy.
      cookie: {
        maxAge: 24 * 60 * 60 * 1000, // Session cookie expiration (24 hours).
        httpOnly: true, // Prevent client-side JavaScript from accessing the cookie.
        secure: process.env.NODE_ENV === "production" ? true : false, // Send cookie only over HTTPS in production.
        sameSite: 'lax', // Controls when cookies are sent with cross-site requests.
      },
    })
  );

  // Initialize Passport.js for authentication.
  app.use(passport.initialize());
  // Enable Passport session support.
  app.use(passport.session());

  // IMPORTANT: No global API prefix (e.g., app.setGlobalPrefix('api')) is set here.
  // This means controllers define their full paths. For example, if AppController
  // has @Controller('api'), then its routes will be prefixed with /api.

  // Start the application and listen for incoming requests on port 3001.
  await app.listen(3001, '0.0.0.0');
}
bootstrap();
