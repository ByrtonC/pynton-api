import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { SignInDataDTO } from './dto/signin-data.dto'
import { ResultOption1, ResultOption2 } from 'src/guards/jwtInterface'

// database
import getAccountByUsername from 'src/database/account/getAccountByUsername'
import getAccountByID from 'src/database/account/getAccountByID'

// bcrypt
import * as bcrypt from 'bcrypt'

import { CodeError } from 'src/appEnum'

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    async AutoSignIn(authorization: string, cookieAccess: string) {
        try {
            const { username } = this.jwtService.verify<ResultOption1>(authorization)
            const data = await getAccountByUsername(username)
            if (data.length !== 1) {
                throw new InternalServerErrorException()
            }
            let dataReturn: any = {
                ...data[0].data(),
                token: authorization,
                token2: cookieAccess,
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
            throw new UnauthorizedException({ message: CodeError.passwordInvalid })
        }
        try {
            const serial = await bcrypt.genSalt(Math.random())
            const { type, updateDate } = data[0].data()
            const exp = Date.now()
            const payload: ResultOption1 = {
                username,
                type,
                updateDate,
                exp,
                cookie,
                serial,
            }
            const payload2: ResultOption2 = {
                exp,
                serial: cookie ? serial : '',
            }
            const authToken = await Promise.all([this.jwtService.sign(payload), this.jwtService.sign(payload2)])
            let dataReturn: any = {
                ...data[0].data(),
                token: authToken[0],
                token2: authToken[1],
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
