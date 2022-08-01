import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common'
import { RegisterDataDTO } from './dto/register-data.dto'

// database
import checkAccountByName from 'src/database/account/checkAccountByName'
import checkAccountByUsername from 'src/database/account/checkAccountByUsername'
import addAccount from 'src/database/account/addAccount'

// enum
import { AccountType, CodeError } from 'src/appEnum'

import * as bcrypt from 'bcrypt'

@Injectable()
export class AccountService {
    async Register(registerData: RegisterDataDTO) {
        const password = await bcrypt.hash(registerData.password, await bcrypt.genSalt(Math.random()))
        const [existsUsername, existsName] = await Promise.all([
            checkAccountByUsername(registerData.username),
            checkAccountByName(registerData.name),
        ])
        if (existsName) {
            throw new InternalServerErrorException({ message: CodeError.existsName })
        }
        if (existsUsername) {
            throw new InternalServerErrorException({ message: CodeError.existsUsername })
        }

        const buildFormRegister = {
            ...registerData,
            password,
            type: AccountType.member,
        }
        const result = await addAccount(buildFormRegister)
        return result
    }
}
