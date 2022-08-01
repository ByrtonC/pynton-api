import * as cookieParser from 'cookie-parser'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { HttpExeptionFilter } from './http-exeption.filter'
import { setupSwagger } from './swagger'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.useGlobalPipes(new ValidationPipe())
    app.useGlobalFilters(new HttpExeptionFilter())

    app.use(cookieParser())

    // enableCors
    app.enableCors({
        origin: ['http://localhost:3000', 'https://pynton.com'],
        methods: ['PUT', 'PATCH', 'DELETE'],
        credentials: true,
    })

    // CSRF Protection
    // app.use(csurf())

    setupSwagger(app)

    await app.listen(8000)
}

bootstrap()
