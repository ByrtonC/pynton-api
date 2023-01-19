import { BadGatewayException, InternalServerErrorException } from '@nestjs/common'
import { CodeError } from 'src/appEnum'
import { firestore } from '../firebaseconfig'

const refAccount = firestore.collection('Accounts')
const getAccountByUsername = async (username: string) => {
    try {
        const result = await refAccount.where('username', '==', username).get()
        if (result.docs.length > 0) {
            return result.docs
        } else {
            throw new InternalServerErrorException()
        }
    } catch (error) {
        throw new BadGatewayException({ message: error.response.message })
    }
}

export default getAccountByUsername
