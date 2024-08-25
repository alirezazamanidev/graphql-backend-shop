import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { IsJWT } from "class-validator";
import { Request } from "express";
import { AuthService } from "../auth.service";
import { log } from "node:console";

@Injectable()
export class GqlAuthGuard implements CanActivate {

    constructor(private readonly authService:AuthService){}
    async canActivate(context: ExecutionContext) {
        const ctx=GqlExecutionContext.create(context);
        
        const req=ctx.getContext().req as Request;
        let token=this.extractToken(req);
    
        req.user=await this.authService.validateAccessToken(token);
     return true
    }
    protected extractToken(request: Request) {
        let accessToken = null;
    
        accessToken = request.headers?.['authorization'];
        
        
        if (!accessToken || accessToken.trim() == '')
          throw new UnauthorizedException('plz Login your account!');
        const [bearer, token] = accessToken.split(' ');
        if (bearer.toLowerCase() !== 'bearer' || !token || !IsJWT(token))
            throw new UnauthorizedException('plz Login your account!');
          
    
        return token;
      }
}