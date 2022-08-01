import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

export const setupSwagger = (app: INestApplication) => {
    const config = new DocumentBuilder()
        .setTitle('Pynton Platform API')
        .setDescription('PP Backend Service .')
        .setVersion('v 1.0')
        .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/', app, document)
}
