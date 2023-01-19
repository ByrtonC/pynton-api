import { ApiProperty } from '@nestjs/swagger'
import { IsString, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

class TestDTO {
    @IsString()
    @ApiProperty()
    a: string

    @IsString()
    @ApiProperty()
    b: string
}

export class SignInDataDTO {
    @IsString()
    @ApiProperty()
    username: string

    @IsString()
    @ApiProperty()
    password: string

    // @ValidateNested()
    // @Type(() => TestDTO)
    // @ApiProperty()
    // test: TestDTO

    cookie?: boolean
}
