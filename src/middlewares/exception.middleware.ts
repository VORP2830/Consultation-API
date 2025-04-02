import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {

    private getDataForResponse(exception: { response: any; status: any; message?: any; }) {
        if (exception.response) {
            const { response, status } = exception;
            return { message: response.message, status: status }
        }

        const status = exception.status || HttpStatus.INTERNAL_SERVER_ERROR;

        const message = exception.message || "Internal Server Error";

        return { status, message }
    }

    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        const { status, message } = this.getDataForResponse(exception);

        response.status(status).json({
            status,
            timestamp: new Date().toISOString(),
            errors: [
                message
            ]
        });
    }
}