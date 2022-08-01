export type AccountType = 'owner' | 'member' | 'visitor'
export interface ResultOption1 {
    username: string
    type: AccountType
    updateDate: Date
    exp: number
    cookie: boolean
    serial: string
}
export interface ResultOption2 {
    exp: number
    serial: string
}
