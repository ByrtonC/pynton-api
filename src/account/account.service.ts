import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common'
import { RegisterDataDTO } from './dto/register-data.dto'

// dto
import { EditAccountDataDTO } from './dto/editAccount-data.dto'

// database
import checkAccountByName from 'src/database/account/checkAccountByName'
import checkAccountByUsername from 'src/database/account/checkAccountByUsername'
import addAccount from 'src/database/account/addAccount'
import getAccountByID from 'src/database/account/getAccountByID'
import editAccountByID from 'src/database/account/editAccountByID'

@Injectable()
export class AccountService {
    async GetUserAccountByID(uid: string) {
        const result = await getAccountByID(uid)
        return { ...result.data(), uid: result.id, password: undefined }
    }

    async EditUserAccountByID(uid: string, data: EditAccountDataDTO) {
        return await editAccountByID(uid, data)
    }
}
