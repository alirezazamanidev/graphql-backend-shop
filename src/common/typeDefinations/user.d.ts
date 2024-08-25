import { IUser } from "src/modules/user/interfaces/request-user.interface";

declare global {
    namespace Express {
        interface Request {
            user?:IUser
          
        }
    }
}
