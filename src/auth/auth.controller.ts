import { Body, Controller, Get, Header, Headers, HttpCode, Post, Request, Response, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Request as RequestType, Response as ResponseType } from 'express'
import AuthGuard from 'src/guards/AuthGuard'
import { AuthService } from './auth.service'

// DTO
import { SignInDataDTO } from './dto/signin-data.dto'
import { RegisterDataDTO } from './dto/register-data.dto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Get('key')
    async GenerateKeyAuth(@Response() res: ResponseType) {
        const data = await this.authService.GenerateKeyAuth()
        res.cookie('token', data.token, { httpOnly: true })
        delete data.token
        return res.send(data)
    }

    @Post('register')
    async Register(@Request() req: RequestType, @Body() data: RegisterDataDTO) {
        return await this.authService.Register(data, req.cookies.token)
    }

    @UseGuards(AuthGuard)
    @Get('signin')
    async AutoSignIn(@Response() res: ResponseType, @Request() req: RequestType) {
        const data = await this.authService.AutoSignIn(req.cookies.accessToken)
        res.cookie('accessToken', data.token, {
            httpOnly: true,
        })
        delete data.token
        return res.send(data)
    }

    @HttpCode(200)
    @Post('signin')
    async SignIn(@Body() signInData: SignInDataDTO, @Response() res: ResponseType) {
        const data = await this.authService.SignIn(signInData)
        res.cookie('accessToken', data.token, {
            httpOnly: true,
        })
        delete data.token
        return res.send(data)
    }

    @UseGuards(AuthGuard)
    @Get('signout')
    SignOut(@Response() res: ResponseType, @Request() req: RequestType) {
        res.cookie('accessToken', '', {
            httpOnly: true,
        })
        return res.send()
    }
}
