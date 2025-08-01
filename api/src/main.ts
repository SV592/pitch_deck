// main.ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import session from "express-session"; // Changed this line
import passport from "passport";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  });

  // Session configuration
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "your-secret-key",
      resave: false,
      saveUninitialized: false,
      proxy: true,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false, // Set secure based on NODE_ENV
        sameSite: 'lax', // Allow cross-site requests for development
      },
    })
  );

  // Initialize Passport
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3001);
  console.log("Backend running on http://localhost:3001");
}
bootstrap();
