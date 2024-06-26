export declare interface UpdateUserInterface {
    id:string
    name?: string;
    description?: string;
    password?: string
    email?: string;
    phone?: string;
    image?: any;
    role?: 'user' | 'teacher' | 'admin'
    roles?: string[];
}
  