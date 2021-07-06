import { NextApiRequest } from 'next';
import { $FIXME } from '@utils/constant';
import {verifyToken} from "@lib/backend/jwt";

export const tokenVerification = async (
    req: NextApiRequest
) => {
    try {
        if (!req.headers.authorization) {
            return {
                status: false,
                message: 'You are not authorized, no token ',
            }
        }
        const authorization: $FIXME = req.headers.authorization.split(' ');
        if (authorization[0] !== 'Bearer') {
            return {
                status: true,
                message: 'You are not authorized, Required Bearer ',
            };
        }
        const verified = await verifyToken(authorization[1]);
        if (!verified) {
            console.log('not verified', verified)
            return {
                status: true,
                message: 'You are not authorized, Not a verified users ',
            };
        }
        return {
            status: true,
            user: verified,
        };
    } catch (e) {
        return {
            status: false,
            message: 'You are not authorized, check your authorization token ',
        };
    }
};
