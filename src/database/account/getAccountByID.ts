import { BadGatewayException, InternalServerErrorException } from '@nestjs/common'
import { CodeError } from 'src/appEnum'
import { firestore } from '../firebaseconfig'

const refAccount = firestore.collection('Accounts')
const getAccountByID = async (id: string) => {
    try {
        const result = await refAccount.doc(id).get()
        if (result.exists) {
            return result
        } else {
            throw new InternalServerErrorException({ message: CodeError.existsID })
        }
    } catch (error) {
        throw new BadGatewayException({ message: error.response.message })
    }
}

export default getAccountByID
