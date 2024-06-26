export declare interface UpdateRoleRequest {
    id: string;
    name?: string;
    permissions?: string[];
    role?: 'user' | 'teacher' | 'admin'
  }