import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common'
import { AccountService } from './account.service'
import { RegisterDataDTO } from './dto/register-data.dto'

@Controller('account')
export class AccountController {
    constructor(private accountService: AccountService) {}

    @Post('register')
    Register(@Body() registerData: RegisterDataDTO) {
        return this.accountService.Register(registerData)
    }
}
