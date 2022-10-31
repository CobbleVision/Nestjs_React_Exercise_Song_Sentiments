import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    registerNewUser(req: any, res: any): Promise<any>;
    deleteUser(req: any, res: any): Promise<any>;
}
