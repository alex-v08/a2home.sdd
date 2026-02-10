import { JwtService } from '@nestjs/jwt';
export declare class AuthController {
    private jwtService;
    constructor(jwtService: JwtService);
    loginMock(body: {
        role: 'CLIENT' | 'PROVIDER';
        id: string;
    }): Promise<{
        access_token: string;
        user: {
            id: string;
            role: "CLIENT" | "PROVIDER";
        };
    }>;
}
