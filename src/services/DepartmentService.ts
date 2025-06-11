import ApiService from './ApiService';
import endpointConfig from '@/configs/endpoint.config';

import type {
  CreateDepartmentInterface,
  UpdateDepartmentInterface,
  DepartmentListResponse,
  DepartmentCreateResponse,
  DepartmentUpdateResponse,
  DepartmentStatusResponse,
  DepartmentUsersResponse,
  DepartmentCustomersResponse,
  DepartmentDetailResponse,
  DepartmentCustomerListResponse
} from '@/shared/interface/Department.interface';

export const getDepartmentList = async (): Promise<DepartmentListResponse> => {
  return ApiService.fetchDataWithAxios({
    url: endpointConfig.departmentList,
    method: 'get',
  });
};

export const deactivateDepartment = async (
  departmentId: number,
): Promise<any> => {
  return ApiService.fetchDataWithAxios({
    url: `${endpointConfig.deactivateDepartment}/${departmentId}`,
    method: 'put'
  });
};

export const getDepartmentByCustomer = async (
  customerId: number,
): Promise<any> => {
  return ApiService.fetchDataWithAxios({
    url: `${endpointConfig.departmentByCustomerId}${customerId}`,
    method: 'get'
  });
};


export const getDepartmentCustomersList = async (): Promise<DepartmentCustomerListResponse> => {
  return ApiService.fetchDataWithAxios({
    url: endpointConfig.departmentCustomerlist,
    method: 'get',
  });
};


export const getDepartmentById = async (
  departmentId: number
): Promise<DepartmentDetailResponse> => {
  return ApiService.fetchDataWithAxios({
    url: `${endpointConfig.departmentDetail}/${departmentId}`,
    method: 'get',
  });
};

// Create new department
export const createDepartment = async (
  department: CreateDepartmentInterface,
  files?: File[]
): Promise<DepartmentCreateResponse> => {
  // Create FormData for file uploads
  const formData = new FormData();
  formData.append('name', department.name);
  formData.append('description', department.description);
  formData.append('customer_id', department.customer_id?.toString() || '');
  formData.append('is_active', department.is_active ? 'true' : 'false');
  

  if (files && files.length > 0) {
    files.forEach(file => {
      formData.append('files', file);
    });
  }

  return ApiService.fetchDataWithAxios({
    url: endpointConfig.departmentCreate,
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};


export const updateDepartment = async (
  departmentId: number,
  department: { name: string; description: string, customer_id:number},
  
): Promise<DepartmentUpdateResponse> => {
  const body = {
    name: department.name,
    description: department.description,
    customer_id: department.customer_id,
  };

  return ApiService.fetchDataWithAxios({
    url: `${endpointConfig.departmentUpdate}/${departmentId}`,
    method: 'put',
    data: body,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
