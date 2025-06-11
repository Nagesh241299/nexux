export const enum UserRoleDATA {
    ADMIN = 'Admin',
    BRAND_USER = 'Brand-User',
}

export const enum OTP_SEND_TOGGLE {
    SMS = 1,
    MAIL = 2,
}

/* define in module Master */
export enum Modules {
    DASHBOARD = 'dashboard',
    USER_MANAGEMENT = 'user-management',
    CUSTOMER_MANAGEMENT = 'customer-management',
    DEPARTMENT_MANAGEMENT = 'department-management',
}

/* define in operation master */
export enum Operations {
    CREATE = 'create',
    READ = 'read',
    UPDATE = 'update',
    DELETE = 'delete',
}

export enum ImageTypeConstant {
    NUTRITION = 'nutrition',
    INGREDIENT = 'ingredient',
    OTHER = 'other',
    front = 'front',
    back = 'back',
}

export const NutriScoreFilters = [
    { label: 'Very good nutritional quality', value: 'A' },
    { label: 'Good nutritional quality', value: 'B' },
    { label: 'Moderate nutritional quality', value: 'C' },
    { label: 'Poor nutritional quality', value: 'D' },
    { label: 'Very poor nutritional quality', value: 'E' },
]

export const NovaScoreFilters = [
    {
        label: 'Unprocessed or minimally processed foods',
        value: 1,
    },
    {
        label: 'Processed culinary ingredients',
        value: 2,
    },
    {
        label: 'Processed foods',
        value: 3,
    },
    {
        label: 'Ultra-processed foods',
        value: 4,
    },
]
