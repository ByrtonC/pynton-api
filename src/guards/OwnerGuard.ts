import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common'
import { Observable } from 'rxjs'
import { JwtService } from '@nestjs/jwt'
import { DataInTokenAccountType, RequestType } from './jwtInterface'

@Injectable()
class OwnerGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest<RequestType<DataInTokenAccountType>>()
        try {
            const result = this.jwtService.verify<DataInTokenAccountType>(request.cookies.accessToken)
            if (result.role === 'owner') {
                request.userData = result
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
