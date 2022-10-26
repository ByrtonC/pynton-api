import { Body, Controller, Get, Header, Headers, HttpCode, Post, Request, Response, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Request as RequestType, Response as ResponseType } from 'express'
import AuthGuard from 'src/guards/AuthGuard'
import { AuthService } from './auth.service'
import { SignInDataDTO } from './dto/signin-data.dto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Get('test')
    Test() {
        return '555'
    }

    @UseGuards(AuthGuard)
    @Get('signin')
    async AutoSignIn(@Headers() { authorization }, @Response() res: ResponseType, @Request() req: RequestType) {
        const cookieAccess = req.cookies.accessToken
        const data = await this.authService.AutoSignIn(authorization, req.cookies.accessToken)
        if (cookieAccess) {
            res.cookie('accessToken', data.token2, {
                httpOnly: true,
            })
        }
        delete data.token2
        return res.send(data)
    }

    @Post('signin')
    async SignIn(@Body() signInData: SignInDataDTO, @Response() res: ResponseType) {
        const data = await this.authService.SignIn(signInData)
        if (signInData.cookie) {
            res.cookie('accessToken', data.token2, {
                httpOnly: true,
            })
        }
        delete data.token2

        return res.send(data)
    }

    @UseGuards(AuthGuard)
    @Get('signout')
    SignOut(@Headers() { authorization }, @Response() res: ResponseType, @Request() req: RequestType) {
        const cookieAccess = req.cookies.accessToken
        if (cookieAccess) {
            res.cookie('accessToken', '', {
                httpOnly: true,
            })
        }
        return res.send()
    }
}
