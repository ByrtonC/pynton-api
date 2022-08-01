import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common'
import { Request, Response } from 'express'
import * as winston from 'winston'
import 'winston-daily-rotate-file'

const transports = new winston.transports.DailyRotateFile({
    filename: './logs/error.log',
    json: true,
    maxSize: '1k',
    maxFiles: 10,
})

const Logger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [transports],
})

@Catch()
export class HttpExeptionFilter<T> implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest<Request>()
        const status = exception instanceof HttpException ? exception.getStatus() : 500

        // console.log(exception.message)
        const getRes = exception.getResponse() as any

        const LogData = {
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: getRes.message,
        }
        Logger.error(LogData)
        response.status(status).json(LogData)
    }
}
