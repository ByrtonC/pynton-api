import { HttpException, HttpStatus, NestMiddleware } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request, Response, NextFunction } from 'express'

export class AuthMiddleWare implements NestMiddleware {
    constructor(private jwtService: JwtService) {}
    async use(req: Request, res: Response, next: NextFunction) {
        const token = req.cookies.accessToken
        try {
            if (token == undefined)
                return res
                    .status(HttpStatus.UNAUTHORIZED)
                    .send(new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED))
            else {
                const verify_acc = await this.jwtService.verify(token)
                next()
            }
        } catch (err) {
            return res.status(HttpStatus.UNAUTHORIZED).send(err)
        }
    }
}
