import { Response } from 'express';
import { errorStatus } from '../../models/output';

const response = {
    responseSuccess: function(res: Response, data: any) {
        res.status(200);
        return res.json({ status: 'Success', statusCode: 200, data: data });
    },
    responseData: function (res: Response, data: any) {
        res.status(200);
        return res.json(data);
    },
    responseError: function(res: Response, errorStatus: errorStatus) {
        let { statusCode, errorCode, message } = errorStatus
        res.status(statusCode ? statusCode : 400);
        return res.json({
            status: 'Error',
            statusCode: statusCode ? statusCode : 400,
            errorCode,
            message,
        });
    }
}

export default response