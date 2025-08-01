import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    console.log(
      "DEBUG: AuthenticatedGuard - Checking auth, user:",
      request.user
    );
    return request.isAuthenticated();
  }
}
