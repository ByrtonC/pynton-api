import { Body, Controller, Param, Get, Post, UseGuards, Request, Patch } from '@nestjs/common'
import AuthGuard from 'src/guards/AuthGuard'
import { AccountService } from './account.service'
import { RegisterDataDTO } from './dto/register-data.dto'
import { RequestType } from 'src/guards/jwtInterface'
import OwnerGuard from 'src/guards/OwnerGuard'

// dto
import { EditAccountDataDTO } from './dto/editAccount-data.dto'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Account')
@Controller('account')
export class AccountController {
    constructor(private accountService: AccountService) {}

    @UseGuards(AuthGuard)
    @Get()
    GetAccount(@Request() req: RequestType) {
        return this.accountService.GetUserAccountByID(req.userData.uid)
    }

    @UseGuards(OwnerGuard)
    @Get(':uid')
    GetAccountByID(@Param() { uid }: { uid: string }) {
        return this.accountService.GetUserAccountByID(uid)
    }

    @UseGuards(AuthGuard)
    @Patch('edit')
    EditAccount(@Request() req: RequestType, @Body() data: EditAccountDataDTO) {
        return this.accountService.EditUserAccountByID(req.userData.uid, data)
    }

    @UseGuards(OwnerGuard)
    @Patch(':uid/edit')
    EditAccountByID(@Param() { uid }: { uid: string }, @Body() data: EditAccountDataDTO) {
        return this.accountService.EditUserAccountByID(uid, data)
    }
}
