import ApiService from './ApiService';
import endpointConfig from '@/configs/endpoint.config';

export const uploadDepartmentDocuments = async (
  departmentId: number,
  files: File[]
): Promise<any> => {
  const formData = new FormData();

  files.forEach(file => {
    formData.append('files', file); 
  });

  return ApiService.fetchDataWithAxios({
    url: `${endpointConfig.documentAdd}${departmentId}`,
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const updateDepartmentDocument = async (
  documentId: number,
  files: File[]
): Promise<any> => {
  const formData = new FormData();

  files.forEach(file => {
    formData.append('file', file);  
  });

  return ApiService.fetchDataWithAxios({
    url: `${endpointConfig.documentUpdate}${documentId}`, 
    method: 'put', 
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};



export const apiDeleteDocument = async (documentId: number) => {
    return ApiService.fetchDataWithAxios({
        url: `${endpointConfig.documentDelete}${documentId}`,
        method: 'delete',
    });
};



