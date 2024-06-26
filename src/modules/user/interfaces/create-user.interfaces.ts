export declare interface CreateUserInterface {
    name: string;
    description: string;
    email: string;
    password?: string
    phone: string;
    image?: any;
    role: "user" | 'teacher' | 'admin'
    roles: string[];
}
  