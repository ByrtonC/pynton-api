import { Request } from 'express'
export type AccountType = 'owner' | 'member' | 'visitor'
export interface DataInTokenAccountType {
    username: string
    role: AccountType
    uid: string
}

export interface RequestType<T = DataInTokenAccountType> extends Request {
    userData: T
}
