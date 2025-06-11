export interface Department {
   id: number | null
    customer_id: number | null
  name: string;
  description: string;
  is_active: boolean;
      sr_no?: number;
  created_by?: number;
  created_on?: string;
  updated_by?: number | null;
  updated_on?: string | null;
}

export interface DepartmentListResponse {
  message: string;
  departments: Department[];
}

export interface AddDepartmentRequest {
  customer_id: number;
  name: string;
  description?: string;
  is_active: boolean;
  documents?: File[];
}

export interface UpdateDepartmentRequest extends AddDepartmentRequest {
  id: number;
}

export interface GetDepartmentByIdResponse {
  message: string;
  department: Department;
}


export interface Customer {
    id: number
    customer_name: string
    
}

export interface DocumentFile {
    id: number
    file_path: string
    file_type: string
    file_name?: string
}

export interface DepartmentRecord {
    id: number
    sr_no: number
    name: string
    description: string
    customer_name: string
    customer_id: number
    is_active: boolean
    documents?: DocumentFile[]
}

