import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common'
import { Observable } from 'rxjs'
import { JwtService } from '@nestjs/jwt'
import { DataInTokenAccountType, RequestType } from './jwtInterface'

@Injectable()
class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest<RequestType>()
        try {
            const result = this.jwtService.verify<DataInTokenAccountType>(request.cookies.accessToken)
            request.userData = result
            return true
        } catch {
            throw new UnauthorizedException()
        }
    }
}

export default AuthGuard
