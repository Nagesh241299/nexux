import {
    AddCustomerSchema,
    CustomerListResponse,
    GetCustomerByIdResponse,
    UpdateCustomerRequest,
} from '@/shared/types/customer'
import ApiService from './ApiService'
import endpointConfig from '@/configs/endpoint.config'

export const apiGetCustomerList = async (): Promise<CustomerListResponse> => {
    return ApiService.fetchDataWithAxios<CustomerListResponse>({
        url: endpointConfig.customerList,
        method: 'get',
    })
}
export const apiGetCustomerById = async (
    customerId: number,
): Promise<GetCustomerByIdResponse> => {
    return ApiService.fetchDataWithAxios<GetCustomerByIdResponse>({
        url: `${endpointConfig.customerData}/${customerId}`,
        method: 'get',
    })
}
export const apiCreateCustomer = async (data: AddCustomerSchema) => {
    const formData = new FormData();

    // Manually append each field to formData
    formData.append('customer_name', data.customer_name);
    formData.append('contact_person', data.contact_person);
    formData.append('email_address', data.email_address);
    formData.append('address', data.address);
    formData.append('city', data.city);
    formData.append('country', data.country);
    formData.append('state', data.state);
    formData.append('pin_code', data.pin_code);
    formData.append('mobile_number', data.mobile_number);
    formData.append('primary_color', data.primary_color);
    formData.append('secondary_color', data.secondary_color);
    formData.append('header_text', data.header_text);
    formData.append('footer_text', data.footer_text);

    // Handle file if exists
    if (data.logo) {
        formData.append('logo', data.logo);
    }

    return ApiService.fetchDataWithAxios({
        url: endpointConfig.createCustomer,
        method: 'post',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};


export const apiUpdateCustomer = async (
    customerId: number,
    data: UpdateCustomerRequest,
): Promise<GetCustomerByIdResponse> => {
    const formData = new FormData();

    // Manually append each field to formData
    formData.append('customer_name', data.customer_name);
    formData.append('contact_person', data.contact_person);
    formData.append('email_address', data.email_address);
    formData.append('address', data.address);
    formData.append('city', data.city);
    formData.append('country', data.country);
    formData.append('state', data.state);
    formData.append('pin_code', data.pin_code);
    formData.append('mobile_number', data.mobile_number);
    formData.append('primary_color', data.primary_color);
    formData.append('secondary_color', data.secondary_color);
    formData.append('header_text', data.header_text);
    formData.append('footer_text', data.footer_text);

    // Append logo if present
    if (data.logo) {
        formData.append('logo', data.logo);
    }

    return ApiService.fetchDataWithAxios<GetCustomerByIdResponse>({
        url: `${endpointConfig.customerData}/${customerId}`,
        method: 'put',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};



export const apiDeactivateCustomer = async (customerId: number) => {
    return ApiService.fetchDataWithAxios({
        url: `${endpointConfig.customerDelete}/${customerId}`,
        method: 'put',
    });
};
