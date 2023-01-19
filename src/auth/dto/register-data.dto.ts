import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class RegisterDataDTO {
    // key: string
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    name: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    username: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    password: string
}
