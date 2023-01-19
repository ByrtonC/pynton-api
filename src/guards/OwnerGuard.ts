import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common'
import { Observable } from 'rxjs'
import { Request } from 'express'
import { JwtService } from '@nestjs/jwt'
import { ResultOption1 } from './jwtInterface'

@Injectable()
class OwnerGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest<Request>()
        try {
            const { role } = this.jwtService.verify<ResultOption1>(request.cookies.accessToken)
            if (role === 'owner') {
                return true
            } else {
                throw new ForbiddenException()
            }
        } catch {
            throw new UnauthorizedException()
        }
    }
}

export default OwnerGuard
