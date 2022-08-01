import { BadGatewayException, InternalServerErrorException } from '@nestjs/common'
import { firestore } from '../firebaseconfig'

const refAccount = firestore.collection('Accounts')
const checkAccountByUsername = async (username: string) => {
    try {
        const result = await refAccount.where('username', '==', username).get()
        if (result.docs.length > 0) {
            return true
        } else {
            return false
        }
    } catch (error) {
        throw new BadGatewayException()
    }
}

export default checkAccountByUsername
