export interface Customer {
  id: number;
  customer_name: string;
  email_address: string;
  mobile_number: string;
knowledge_base_count:number;
user_count:number;
  address: string;
  city: string;
  state: string;
  country: string;
  pin_code: string;
  contact_person: string;
  header_text: string;
  footer_text: string;
  primary_color: string;
  secondary_color: string;
  logo_url: string;
  is_active: boolean;
  created_by: number;
  created_on: string;
  updated_by?: number | null;
  updated_on?: string |undefined;
}

export interface CustomerListResponse {
    customers: never[];
    message: string;
    data: Customer[];
}

export interface AddCustomerSchema {
    customer_name: string;
    address: string;
    country: string;
    state: string;
    city: string;
    pin_code: string;
    contact_person: string;
    mobile_number: string;
    email_address: string;
    header_text: string;
    footer_text: string;
    primary_color: string;
    secondary_color: string;
    logo: File;
    is_active: boolean;
}
 
  export interface GetCustomerByIdResponse {
    message: string;
    customer: Customer;
  }

export interface UpdateCustomerRequest {
    customer_name: string;
    address: string;
    country: string;
    state: string;
    city: string;
    pin_code: string;
    contact_person: string;
    mobile_number: string;
    email_address: string;
    header_text: string;
    footer_text: string;
    primary_color: string;
    secondary_color: string;
    logo: File ;
    is_active: boolean;
    [key: string]: string | boolean |File; 

  }
  
  
