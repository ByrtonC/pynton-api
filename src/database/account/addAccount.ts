import { BadGatewayException, InternalServerErrorException } from '@nestjs/common'
import { firestore } from '../firebaseconfig'
import { CodeError } from 'src/appEnum'

const refAccount = firestore.collection('Accounts')
interface FormAddAccountType {
    name: string
    email: string
    username: string
    password: string
    type: 'member' | 'owner'
}
const addAccount = async (data: FormAddAccountType) => {
    try {
        const result = await refAccount.add({
            ...data,
            createBy: 'root',
            createDate: new Date(),
            updateBy: 'root',
            updateDate: new Date(),
        })

        if (result.id) {
            return true
        } else {
            throw new BadGatewayException({ message: CodeError.usernameInvalid })
        }
    } catch (error) {
        throw new BadGatewayException({ message: error.response.message })
    }
}

export default addAccount
