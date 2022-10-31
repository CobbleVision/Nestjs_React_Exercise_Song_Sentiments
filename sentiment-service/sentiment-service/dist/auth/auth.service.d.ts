import { UserService } from '../user/user.service';
export declare class AuthService {
    private usersService;
    constructor(usersService: UserService);
    validateUser(username: string, pass: string): Promise<any>;
}
