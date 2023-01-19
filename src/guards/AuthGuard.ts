import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Observable } from 'rxjs'
import { Request } from 'express'
import { JwtService } from '@nestjs/jwt'
import { ResultOption1 } from './jwtInterface'

@Injectable()
class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest<Request>()
        // const { authorization: authToken } = request.headers
        try {
            this.jwtService.verify<ResultOption1>(request.cookies.accessToken)
            return true
        } catch {
            throw new UnauthorizedException()
        }
    }
}

export default AuthGuard
