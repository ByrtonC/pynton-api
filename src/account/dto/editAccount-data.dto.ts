import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString } from 'class-validator'

export class EditAccountDataDTO {
    @IsString()
    @ApiProperty()
    name: string

    @IsString()
    @ApiProperty()
    photoURL: string

    @IsString()
    @ApiProperty()
    description: string
}
