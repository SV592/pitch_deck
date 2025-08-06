import { Injectable, ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import * as jose from 'jose';
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(private configService: ConfigService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log("JwtAuthGuard: Incoming Authorization header:", request.headers.authorization);

    // Check if it's a JWE token and attempt decryption
    const authHeader = request.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer eyJhbGciOiJkaXIiLCJl')) { // Check for Bearer and JWE prefix
      const token = authHeader.split(' ')[1];
      try {
        console.log("JwtAuthGuard: Attempting to decrypt JWE token...");
        const auth0Secret = this.configService.get<string>("AUTH0_SECRET");
        
        let secret;
        let decrypted = false;
        
        // Try hex format
        try {
          secret = Buffer.from(auth0Secret, 'hex');
          const { plaintext } = await jose.compactDecrypt(token, secret);
          const decryptedToken = new TextDecoder().decode(plaintext);
          console.log("JwtAuthGuard: Successfully decrypted JWE token with hex secret. Decrypted token (first 20 chars):", decryptedToken.substring(0, 20) + "...");
          request.headers.authorization = `Bearer ${decryptedToken}`;
          decrypted = true;
        } catch (error1: any) {
          console.log("JwtAuthGuard: Hex secret decryption failed:", error1.message);
        }
        
        // Try UTF-8 format
        if (!decrypted) {
          try {
            secret = new TextEncoder().encode(auth0Secret);
            const { plaintext } = await jose.compactDecrypt(token, secret);
            const decryptedToken = new TextDecoder().decode(plaintext);
            console.log("JwtAuthGuard: Successfully decrypted JWE token with UTF-8 secret. Decrypted token (first 20 chars):", decryptedToken.substring(0, 20) + "...");
            request.headers.authorization = `Bearer ${decryptedToken}`;
            decrypted = true;
          } catch (error2: any) {
            console.log("JwtAuthGuard: UTF-8 secret decryption failed:", error2.message);
          }
        }
        
        if (!decrypted) {
          console.log("JwtAuthGuard: All decryption methods failed, returning false.");
          return false;
        }
      } catch (error: any) {
        console.log("JwtAuthGuard: Failed to decrypt JWE token:", error.message);
        return false;
      }
    }

    const canActivateResult = await super.canActivate(context) as boolean;
    console.log("JwtAuthGuard: super.canActivate result:", canActivateResult);
    return canActivateResult;
  }
}
