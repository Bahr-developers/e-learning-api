export declare interface CreateRoleRequest {
    name: string;
    permissions: string[]
    role: "user" | 'teacher' | 'admin'
  }