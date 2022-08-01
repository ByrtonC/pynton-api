import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString } from 'class-validator'

export class RegisterDataDTO {
    @IsString()
    @ApiProperty()
    username: string

    @IsString()
    @ApiProperty()
    password: string

    @IsString()
    @ApiProperty()
    name: string

    @IsString()
    @ApiProperty()
    email: string
}
