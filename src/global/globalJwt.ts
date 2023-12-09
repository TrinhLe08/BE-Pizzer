import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class JwtService {
  sign(payload: any, expiresIn: string): string {
    return jwt.sign(payload, process.env.DB_KEY, { expiresIn: expiresIn });
  }

  verify(token: string) {
    return jwt.verify(token, process.env.DB_KEY);
  }
}
