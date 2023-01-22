import { BadGatewayException, InternalServerErrorException } from '@nestjs/common'
import { CodeError } from 'src/appEnum'
import { firestore } from '../firebaseconfig'
import { EditAccountDataDTO } from 'src/account/dto/editAccount-data.dto'

const refAccount = firestore.collection('Accounts')
const editAccountByID = async (id: string, data: EditAccountDataDTO) => {
    try {
        const result = await refAccount.doc(id).update({
            ...data,
        })
        return result
        // if (result.writeTime) {
        //     return result
        // } else {
        //     throw new InternalServerErrorException({ message: CodeError.existsID })
        // }
    } catch (error) {
        throw new BadGatewayException({ message: error.response.message })
    }
}

export default editAccountByID
