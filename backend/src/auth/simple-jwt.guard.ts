import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';
import * as jwksClient from 'jwks-rsa';

@Injectable()
export class SimpleJwtGuard implements CanActivate {
  private jwksClient = jwksClient({
    jwksUri: `https://${process.env.AUTH0_DOMAIN || 'dev-6g2scdjmkku3pjvo.us.auth0.com'}/.well-known/jwks.json`,
    cache: true,
    rateLimit: true,
  });

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const ctx = GqlExecutionContext.create(context);
      const request = ctx.getContext().req;
      
      const authHeader = request.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedException('No valid authorization header');
      }

      const token = authHeader.substring(7);
      const decoded = jwt.decode(token, { complete: true });
      
      if (!decoded || !decoded.header.kid) {
        throw new UnauthorizedException('Invalid token format');
      }

      const key = await this.getSigningKey(decoded.header.kid);
      const verified = jwt.verify(token, key, {
        audience: process.env.AUTH0_AUDIENCE || 'https://book-management-api',
        issuer: `https://${process.env.AUTH0_DOMAIN || 'dev-6g2scdjmkku3pjvo.us.auth0.com'}/`,
        algorithms: ['RS256'],
      });

      request.user = verified;
      return true;
    } catch (error) {
      console.error('JWT verification failed:', error.message);
      throw new UnauthorizedException('Invalid token');
    }
  }

  private async getSigningKey(kid: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.jwksClient.getSigningKey(kid, (err, key) => {
        if (err) {
          reject(err);
        } else {
          resolve(key.getPublicKey());
        }
      });
    });
  }
}