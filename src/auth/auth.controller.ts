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

    // @UseGuards(AuthGuard)
    // @Get('signin')
    // AutoSignIn(@Headers() { authorization }) {
    //     return this.authService.AutoSignIn(authorization)
    // }

    // @UseGuards(AuthGuard)
    @Post('signin')
    async SignIn(@Body() signInData: SignInDataDTO, @Response() res: ResponseType, @Request() req: RequestType) {
        const data = await this.authService.SignIn(signInData)
        res.cookie('accessToken', data.token2, {
            httpOnly: true,
        })
        delete data.token2

        return res.send(data)
    }
}
