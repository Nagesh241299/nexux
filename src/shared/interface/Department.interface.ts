// Department.interface.ts
export interface ApiResponse {
  success: boolean;
  message: string;
}

export interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  total_pages: number;
  total_filters?: number;
}

export interface DepartmentCustomerListResponse {
  message: string;
  departments: {
    [departmentName: string]: Department[];
  };
}

interface Department {
  id: number;
  name: string;
}

export interface Document {
  id: number;
  department_id: number;
  file_path: string;
  file_type: string;
  is_active: boolean;
  created_by: number;
  created_on: string;
  name: string;
}

export interface DepartmentListInterface {
  id: number;
  customer_id: number;
  name: string;
  description: string;
  vector_db_url: string;
  is_active: boolean;
  created_by: number;
  created_on: string;
  updated_by: number | null;
  updated_on: string | null;
  customer_name: string;
  documents: Document[];
  sr_no?: number;
}

export interface DepartmentDetailInterface extends DepartmentListInterface {
  files?: FileInterface[];
}

export interface FileInterface {
  id: number;
  file_name: string;
  file_url: string;
  file_type: string;
  created_at: string;
}

export interface CreateDepartmentInterface {
  id?: number;
  customer_id: number | null;
  name: string;
  description: string;
  is_active: boolean;
}

export interface UpdateDepartmentInterface extends CreateDepartmentInterface {
  id: number;
}

export interface DepartmentUserInterface {
  id: number;
  user_id: number;
  department_id: number;
  user_name: string;
  user_email: string;
  created_at: string;
}

export interface DepartmentCustomerInterface {
  id: number;
  customer_id: number;
  department_id: number;
  customer_name: string;
  created_at: string;
}

export interface UserInterface {
  id: number;
  full_name: string;
  email: string;
}

export interface CustomerInterface {
  id: number;
  name: string;
}

// API Response Types
export interface DepartmentListResponse {
  message: string;
  departments: DepartmentListInterface[];
}

export interface DepartmentDetailResponse {
  message: string;
  department: DepartmentDetailInterface;
}

export interface DepartmentCreateResponse {
  message: string;
  department: DepartmentDetailInterface;
  file_uploads: FileInterface[];
}

export interface DepartmentUpdateResponse {
  message: string;
  department: DepartmentDetailInterface;
}

export interface DepartmentStatusResponse {
  message: string;
  department: DepartmentDetailInterface;
}

export interface DepartmentUsersResponse {
  message: string;
  department_id: number;
  users: DepartmentUserInterface[];
}

export interface DepartmentCustomersResponse {
  message: string;
  department_id: number;
  customers: DepartmentCustomerInterface[];
}

