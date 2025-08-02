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
    const token = this.extractTokenFromHeader(request);
    
    if (!token) {
      return false;
    }

    // If it's a JWE token, decrypt it first
    if (token.startsWith('eyJhbGciOiJkaXIiLCJl')) {
      try {
        console.log("Attempting to decrypt JWE token in guard...");
        const auth0Secret = this.configService.get<string>("AUTH0_SECRET");
        console.log("AUTH0_SECRET available:", !!auth0Secret);
        if (auth0Secret) {
          console.log("AUTH0_SECRET length:", auth0Secret.length);
          console.log("AUTH0_SECRET (first 10 chars):", auth0Secret.substring(0, 10) + "...");
        }
        
        let secret;
        let decrypted = false;
        
        // Try hex format
        try {
          secret = Buffer.from(auth0Secret, 'hex');
          console.log("Using hex secret, length:", secret.length);
          const { plaintext } = await jose.compactDecrypt(token, secret);
          const decryptedToken = new TextDecoder().decode(plaintext);
          console.log("Successfully decrypted JWE token with hex secret");
          request.headers.authorization = `Bearer ${decryptedToken}`;
          decrypted = true;
        } catch (error1: any) {
          console.log("Hex secret failed:", error1.message);
        }
        
        // Try UTF-8 format
        if (!decrypted) {
          try {
            secret = new TextEncoder().encode(auth0Secret);
            console.log("Using UTF-8 secret, length:", secret.length);
            const { plaintext } = await jose.compactDecrypt(token, secret);
            const decryptedToken = new TextDecoder().decode(plaintext);
            console.log("Successfully decrypted JWE token with UTF-8 secret");
            request.headers.authorization = `Bearer ${decryptedToken}`;
            decrypted = true;
          } catch (error2: any) {
            console.log("UTF-8 secret failed:", error2.message);
          }
        }
        
        if (!decrypted) {
          console.log("All decryption methods failed");
          return false;
        }
      } catch (error) {
        console.log("Failed to decrypt JWE token:", error.message);
        return false;
      }
    }

    return super.canActivate(context) as Promise<boolean>;
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
