import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class SignInDataDTO {
    @IsString()
    @ApiProperty()
    username: string

    @IsString()
    @ApiProperty()
    password: string

    cookie?: boolean
}
