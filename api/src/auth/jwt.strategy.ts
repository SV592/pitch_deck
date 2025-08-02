import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { passportJwtSecret } from "jwks-rsa";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    const issuerBaseURL = configService.get<string>("AUTH0_ISSUER_BASE_URL");
    const audience = configService.get<string>("AUTH0_AUDIENCE");
    
    console.log("JWT Strategy Configuration:", {
      issuerBaseURL: issuerBaseURL || "NOT SET",
      audience: audience || "NOT SET",
      jwksUri: `${issuerBaseURL}.well-known/jwks.json`
    });

    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${issuerBaseURL}.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: audience,
      issuer: issuerBaseURL,
      algorithms: ["RS256"],
    });
  }

  validate(payload: any) {
    console.log("JWT Payload received:", {
      sub: payload.sub,
      aud: payload.aud,
      iss: payload.iss,
      exp: payload.exp
    });
    return payload;
  }
}
