import crypto from 'crypto';
import { $FIXME } from '@utils/constant';

export const hashPassword = (password: string): $FIXME => {
    return new Promise((resolve, reject) => {
        // generate random 16 bytes long salt
        const salt = crypto.randomBytes(16).toString('hex');

        crypto.scrypt(password, salt, 64, (err: $FIXME, derivedKey: $FIXME) => {
            if (err) reject(err);
            resolve(`${salt}:${derivedKey.toString('hex')}`);
        });
    });
};

export const checkPassword = (password: string, hash: $FIXME): $FIXME => {
    return new Promise((resolve, reject) => {
        const [salt, key] = hash.split(':');
        crypto.scrypt(password, salt, 64, (err:$FIXME, derivedKey: $FIXME) => {
            if (err) reject(err);
            resolve(key === derivedKey.toString('hex'));
        });
    });
};
