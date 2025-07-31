import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { JwksClient } from 'jwks-rsa';

@Injectable()
export class Auth0Strategy extends PassportStrategy(JwtStrategy, 'auth0') {
  constructor() {
    super({
      secretOrKeyProvider: (request: any, rawJwtToken: string, done: (err: any, secret?: string | Buffer) => void) => {
        const jwksClient = new JwksClient({
          jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
        });
        const decoded = require('jsonwebtoken').decode(rawJwtToken, { complete: true });
        if (!decoded || typeof decoded === 'string' || !decoded.header) {
          return done(new Error('Invalid JWT token'), undefined);
        }
        jwksClient.getSigningKey(decoded.header.kid, (err, key) => {
          if (err) {
            return done(err, undefined);
          }
          if (!key) {
            return done(new Error('Key not found'), undefined);
          }
          const signingKey = key.getPublicKey();
          done(null, signingKey);
        });
      },

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: process.env.AUTH0_AUDIENCE,
      issuer: `https://${process.env.AUTH0_DOMAIN}/`,
      algorithms: ['RS256'],
    });
  }

  async validate(payload: any) {
    return payload; // The payload contains the user information from Auth0
  }
}
