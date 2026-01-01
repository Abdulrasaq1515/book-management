import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { ConfigService } from '@nestjs/config';

/**
 * JWT Authentication Strategy using Auth0
 * - Validates JWT tokens from Auth0
 * - Extracts user information from token payload
 * - Uses JWKS to verify token signature
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    const domain = process.env.AUTH0_DOMAIN || 'dev-6g2scdjmkku3pjvo.us.auth0.com';
    const audience = process.env.AUTH0_AUDIENCE || 'https://book-management-api';

    super({
      // Extract JWT from Authorization header as Bearer token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      // Auth0 audience (API identifier)
      audience: audience,

      // Auth0 issuer URL
      issuer: `https://${domain}/`,

      // Use Auth0's JWKS endpoint to get public keys for verification
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${domain}/.well-known/jwks.json`,
      }),

      // Verify token algorithms
      algorithms: ['RS256'],

      // Pass request to validate method
      passReqToCallback: false,
    });
  }

  /**
   * Validate the JWT payload
   * This method is called after the token is verified
   * The returned object will be attached to request.user
   */
  async validate(payload: any): Promise<any> {
    console.log('JWT payload received:', payload);
    
    if (!payload) {
      console.error('No payload received');
      throw new UnauthorizedException('Invalid token: no payload');
    }

    if (!payload.sub) {
      console.error('No sub claim in payload');
      throw new UnauthorizedException('Invalid token: missing sub claim');
    }

    const user = {
      sub: payload.sub,
      email: payload.email,
      name: payload.name,
      permissions: payload.permissions || [],
    };

    console.log('User validated:', user);
    return user;
  }
}