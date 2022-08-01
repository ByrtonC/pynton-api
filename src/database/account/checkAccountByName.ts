import { BadGatewayException, InternalServerErrorException } from '@nestjs/common'
import { firestore } from '../firebaseconfig'

const refAccount = firestore.collection('Accounts')
const checkAccountByName = async (name: string) => {
    try {
        const result = await refAccount.where('name', '==', name).get()
        if (result.docs.length > 0) {
            return true
        } else {
            return false
        }
    } catch (error) {
        throw new BadGatewayException()
    }
}

export default checkAccountByName
