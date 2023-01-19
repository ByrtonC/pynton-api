import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { SignInDataDTO } from './dto/signin-data.dto'
import { ResultOption1 } from 'src/guards/jwtInterface'

// dto
import { RegisterDataDTO } from './dto/register-data.dto'

// database
import addAccount from 'src/database/account/addAccount'
import getAccountByUsername from 'src/database/account/getAccountByUsername'
import getAccountByID from 'src/database/account/getAccountByID'
import checkAccountByName from 'src/database/account/checkAccountByName'
import checkAccountByUsername from 'src/database/account/checkAccountByUsername'

// bcrypt
import * as bcrypt from 'bcrypt'

import { CodeError } from 'src/appEnum'

// utils
import { generateKeyPair, decrypt } from 'src/utils'
// import { generatePrivateAndPublicKey, decrypt } from 'src/utils'

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    async GenerateKeyAuth() {
        const { publicKey, privateKey } = generateKeyPair()
        const token = this.jwtService.sign({ key: privateKey })
        return {
            key: publicKey,
            token,
        }
    }

    async Register(data: RegisterDataDTO, token: string) {
        const password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(Math.random()))
        const [existsUsername, existsName] = await Promise.all([
            checkAccountByUsername(data.username),
            checkAccountByName(data.name),
        ])
        if (existsName) {
            throw new InternalServerErrorException({ message: CodeError.existsName })
        }
        if (existsUsername) {
            throw new InternalServerErrorException({ message: CodeError.existsUsername })
        }

        const buildFormRegister = {
            ...data,
            password,
        }
        const result = await addAccount(buildFormRegister)
        return result
    }

    async AutoSignIn(authorization: string) {
        try {
            const { username } = this.jwtService.verify<ResultOption1>(authorization)
            const data = await getAccountByUsername(username)
            if (data.length !== 1) {
                throw new InternalServerErrorException()
            }
            let dataReturn: any = {
                ...data[0].data(),
                token: authorization,
            }
            delete dataReturn.password
            delete dataReturn.updateBy
            delete dataReturn.updateDate
            delete dataReturn.createBy
            delete dataReturn.createDate
            return dataReturn
        } catch {
            throw new InternalServerErrorException()
        }
    }

    async SignIn({ username, password, cookie }: SignInDataDTO) {
        const data = await getAccountByUsername(username)
        if (data.length > 1 || !(await bcrypt.compare(password, data[0].data().password))) {
            throw new UnauthorizedException({ message: 'CodeError.passwordInvalid' })
        }
        try {
            const { role } = data[0].data()
            const payload: ResultOption1 = {
                username,
                role,
            }
            const authToken = this.jwtService.sign(payload, { expiresIn: '3600s' })
            let dataReturn: any = {
                ...data[0].data(),
                token: authToken,
            }
            delete dataReturn.password
            delete dataReturn.updateBy
            delete dataReturn.updateDate
            delete dataReturn.createBy
            delete dataReturn.createDate
            return dataReturn
        } catch (error) {
            throw new InternalServerErrorException()
        }
    }
}
