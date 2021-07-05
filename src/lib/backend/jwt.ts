import { $FIXME } from '@utils/constant';
import jwt from "jsonwebtoken"
export const createToken = (obj: $FIXME): $FIXME => {
    const payload = {
        _id: obj._id,
        role: obj.role,
        email: obj.email,
    };
    return jwt.sign(payload, "QUtEpYUzqviAPLnlaTqAo15vVodLaD", {
        expiresIn: 1500,
    });
};

export const decodeToken = (token: string): $FIXME => {
    return jwt.decode(token);
};

export const verifyToken = (authorization: $FIXME): $FIXME => {
    return jwt.verify(authorization, "QUtEpYUzqviAPLnlaTqAo15vVodLaD");
};
