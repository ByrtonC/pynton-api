import { Controller, Post, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express/multer'
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger'
import AuthGuard from 'src/guards/AuthGuard'
import { FileService } from './file.service'

@ApiTags('file')
@Controller('file')
export class FileController {
    constructor(private fileService: FileService) {}

    @UseGuards(AuthGuard)
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                files: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @Post('upload')
    @UseInterceptors(FileInterceptor('files'))
    uploadFile(@UploadedFile() files: Express.Multer.File[]) {
        console.log(files)
        return 'test'
    }
}
