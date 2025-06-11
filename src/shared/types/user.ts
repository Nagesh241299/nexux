export interface User {
  id: number;
  first_name: string;
  last_name: string | null;
  email_address: string | null;
  mobile_number: string | null;
  is_active: boolean;
  role_name:string;
  customer_name:string;
  departments:[];
  is_first_time_login?: boolean;
}

export interface UserResponse {
  message: string;
  users: User[];
}

export interface UserDetailResponse {
  message: string;
  user: User;
}

export interface AddUserSchema {
  first_name: string;
  last_name: string | null;
  email_address: string | null;
  mobile_number: string | null;
  role :string
  customer_id:number
  department_id:number
    [key: string]: string | boolean | null | number; 

}

export interface UpdateUserRequest{
  first_name: string;
  last_name: string | null;
  email_address: string | null;
  mobile_number: string | null;
  role :string;
  customer_id:number;
  department_id:number;
  [key: string]: string | boolean | null | number; 

}

