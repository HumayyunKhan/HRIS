import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';

export const RequestUser = createParamDecorator((_data: unknown, context: ExecutionContext) => {
  let request: Request = context.switchToHttp().getRequest<Request>();
  return request.user;
});
