import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { UnAuthorizedException } from 'src/shared';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    console.log("INSIDE JWT AUTH GUARD")
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [context.getHandler(), context.getClass()]);

    if (isPublic) {
      // console.log("public route")
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest(err, isAuthenticated, info) {
    console.log("TOKEN CHECK FUNCTION")
    console.log("TOKEN CHECK FUNCTION",err)
    console.log("TOKEN CHECK FUNCTION",isAuthenticated)
    console.log("TOKEN CHECK FUNCTION",info)
    if (err || !isAuthenticated) {
      if (info && info.message) {

        if (info.message === 'No auth token') {
          throw new UnAuthorizedException('MISSING_AUTH_TOKEN');
        } else if (info.message === 'invalid signature') {
          throw new UnAuthorizedException('INVALID_TOKEN');
        } else if (info.message === 'jwt expired') {
          throw new UnAuthorizedException('EXPIRED_TOKEN');
        }
      }

      throw new UnAuthorizedException('UNAUTHORIZED');
    }
    // isAuthenticated = info;
    return isAuthenticated;
  }
}

// @Injectable()
// export class JwtAuthGuard extends AuthGuard('jwt') {
//   constructor(private reflector: Reflector) {
//     super();
//   }

//   canActivate(context: ExecutionContext) {
//     const excluded = this.reflector.get<boolean>('excluded', context.getHandler());

//     if (excluded) {
//       return true;   
//     }

//     // Call the parent AuthGuard canActivate method
//     return super.canActivate(context);
//   }

//   handleRequest(err: any, userId: any, info: any) {
//     console.log("----------------------INSIDE ------------------------")
//     console.log(err,"--------------------",info,"-------------",userId,"-----------------")
//     // Check if user is authenticated or not
//     if (err || !userId) {
//       console.log("============================")
//       // Throw a custom UnauthorizedException with your desired message
//       const errorMessage = 'You Need To Login First'; // Replace with your custom error message
// const customError = {
//   message: errorMessage,
// };
// throw new UnauthorizedException("Token Invalid")
//     // return constructErrorResponse(customError);
//     }
//     return userId;
//   }
// }

