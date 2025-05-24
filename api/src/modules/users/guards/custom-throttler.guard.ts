import { ThrottlerGuard } from '@nestjs/throttler';
import { Injectable } from '@nestjs/common';
import { isArray } from 'class-validator';

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  protected getTracker(req: Record<string, any>): Promise<string> {
    const ip =
      req.ips && isArray(req.ips) ? (req.ips[0] as string) : (req.ip as string);

    return Promise.resolve(ip);
  }
}
