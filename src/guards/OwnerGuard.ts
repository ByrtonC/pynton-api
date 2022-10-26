import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common'
import { Observable } from 'rxjs'
import { Request } from 'express'
import { JwtService } from '@nestjs/jwt'
import { ResultOption1, ResultOption2 } from './jwtInterface'

@Injectable()
class OwnerGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest<Request>()
        const { authorization: authToken } = request.headers
        try {
            const { serial: s1, exp: e1, type } = this.jwtService.verify<ResultOption1>(authToken)
            if (request.cookies.accessToken) {
                const { serial: s2, exp: e2 } = this.jwtService.verify<ResultOption2>(authToken)
                if (s1 === s2 && e1 == e2) {
                    if (type === 'owner') {
                        return true
                    } else {
                        throw new ForbiddenException()
                    }
                } else {
                    return false
                }
            }
            if (type === 'owner') {
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