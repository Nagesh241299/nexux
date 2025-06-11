import type { RuleObject } from 'antd/lib/form'

class FormInputRules {
    public static validateMobileNumber() {
        return {
            validator: (_: RuleObject, value: string) => {
                if (!value || /^\d{10}$/.test(value)) {
                    return Promise.resolve()
                } else {
                    return Promise.reject(
                        new Error(
                            'Please enter a valid 10-digit mobile number',
                        ),
                    )
                }
            },
        }
    }

    public static WhiteSpaceRule() {
        return {
            validator: (_: RuleObject, value: string) => {
                if (value && (value.startsWith(' ') || value.endsWith(' '))) {
                    return Promise.reject(
                        new Error(
                            'Please avoid spaces at the beginning or end of your input.',
                        ),
                    )
                } else {
                    return Promise.resolve()
                }
            },
        }
    }

    public static EmailValidationRule() {
        return {
            validator: (_: RuleObject, value: string) => {
                const valueWithoutTrailingSpace = value?.replace(/\s+$/, '')

                if (!valueWithoutTrailingSpace) {
                    return Promise.resolve()
                }

                // Check if the value without trailing spaces is a valid email
                const isValidEmail =
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                        valueWithoutTrailingSpace,
                    )

                // If the email is valid, return success
                if (isValidEmail) {
                    return Promise.resolve()
                }

                // If the email is not valid, return error message
                return Promise.reject(
                    new Error('The input is not valid Email!'),
                )
            },
        }
    }

    public static ContactNumberValidationRule() {
        return {
            validator: (_: RuleObject, value: string) => {
                // Define the regex for a valid contact number
                const validNumberRegex = /^\+\d{2}\s?\d{10}$/
                // Define the invalid sequence
                const invalidSequence = '0000000000'

                // Check if the value is valid based on regex and does not end with the invalid sequence
                if (
                    value &&
                    validNumberRegex.test(value) &&
                    !value.endsWith(invalidSequence)
                ) {
                    return Promise.resolve()
                }

                // If check fails, return a rejection with an error message
                return Promise.reject(
                    new Error(
                        'Invalid contact number format. Please enter a valid country code (+91) with a 10-digit number. For example: +91XXXXXXXXXX',
                    ),
                )
            },
        }
    }

    public static ContactNumberValidation2Rule() {
        return {
            validator: (_: RuleObject, value: string) => {
                if (
                    !value ||
                    (value !== '0000000000' && /^\d{10}$/.test(value))
                ) {
                    return Promise.resolve()
                }
                return Promise.reject(
                    new Error(
                        'Invalid contact number format. Please enter a valid 10-digit number.',
                    ),
                )
            },
        }
    }

    public static ValidateNameField() {
        return {
            validator: (_: RuleObject, value: string) => {
                const trimmedValue = value?.trim()

                // Define the regex for allowed characters (letters, digits, single quotes, and hyphens)
                const validNameRegex =
                    /^[a-zA-Z0-9'-]+(?:[ '-][a-zA-Z0-9'-]+)*$/

                // Check if the trimmed value is valid based on the regex
                if (!trimmedValue || validNameRegex.test(trimmedValue)) {
                    return Promise.resolve()
                } else {
                    return Promise.reject(
                        new Error(
                            "Name can only contain letters (a-z, A-Z), numbers (0-9), single quotes ('), and hyphens (-).",
                        ),
                    )
                }
            },
        }
    }

    public static ValidateFirstAndLastName() {
        return {
            validator: (_: RuleObject, value: string) => {
                const trimmedValue = value?.trim()

                // Define the regex for the allowed characters (letters, single quotes, and hyphens)
                const validNameRegex = /^[a-zA-Z-']+(?:[ '-][a-zA-Z-']+)*$/

                // Check if the trimmed value is valid based on the regex
                if (!trimmedValue || validNameRegex.test(trimmedValue)) {
                    return Promise.resolve()
                } else {
                    return Promise.reject(
                        new Error(
                            "Name can only contain letters, single quotes ('), and hyphens (-).",
                        ),
                    )
                }
            },
        }
    }

    public static NumberValidationRule() {
        return {
            validator: (_: RuleObject, value: string) => {
                if (
                    value &&
                    (!Number.isInteger(Number(value)) || Number(value) <= 0)
                ) {
                    return Promise.reject(new Error('Input must be a number.'))
                }
                return Promise.resolve()
            },
        }
    }

    public static maxLengthRule(
        maxLength: number,
        fieldName: string,
        fieldType?: string,
    ) {
        return {
            max: maxLength,
            message: `${fieldName} should be less than ${maxLength} ${fieldType ? fieldType : 'characters'}`,
        }
    }

    public static minLengthRule(minLength: number, fieldName: string) {
        return {
            min: minLength,
            message: `${fieldName} should be minimum ${minLength} character long.`,
        }
    }

    public static requiredFieldInputRule(fieldName: string) {
        return {
            required: true,
            message: `Please input ${fieldName}.`,
        }
    }
    public static requiredFieldSelectRule(fieldName: string) {
        return {
            required: true,
            message: `Please select ${fieldName}.`,
        }
    }

    public static allowOnlyDigitsRule(fieldName: string) {
        return {
            pattern: /^[0-9]*$/,
            message: `${fieldName} must be in digits.`,
        }
    }

    public static allowOnlyCharactersRule() {
        return {
            pattern: /^[a-zA-Z-. ]+$/,
            message:
                'Only letters (a-z, A-Z), periods (.), hyphens (-) are allowed.',
        }
    }

    public static getStrongPasswordRule() {
        return [
            { min: 8, message: 'password must be minimum 8 characters.' },
            {
                max: 12,
                message: 'Password cannot be greater than 12 characters',
            },
            {
                pattern: /[A-Z]/,
                message: 'Password must contain at least one uppercase letter.',
            },
            {
                pattern: /[a-z]/,
                message: 'Password must contain at least one lowercase letter.',
            },
            {
                pattern: /\d/,
                message: 'Password must contain at least one digit.',
            },
            {
                pattern: /[$&+,:;=?@#|'<>.^*()%!-]/,
                message:
                    'Password must contain at least one special character.',
            },
        ]
    }

    public static allowOnlyAlphanumericAndHyphensRule() {
        return {
            validator: (_: RuleObject, value: string) => {
                const valueWithoutTrailingSpace = value?.replace(/\s+$/, '')

                if (!valueWithoutTrailingSpace) {
                    return Promise.resolve()
                }

                // Check if the value without trailing spaces is valid (alphanumeric + hyphens only)
                const isValid = /^[a-zA-Z0-9-]+$/.test(
                    valueWithoutTrailingSpace,
                )

                // If the value is valid, return success
                if (isValid) {
                    return Promise.resolve()
                }

                // If the value is not valid, return error message
                return Promise.reject(
                    new Error(
                        'Only letters (a-z, A-Z), numbers (0-9), and hyphens (-) are allowed.',
                    ),
                )
            },
        }
    }

    public static faqQuestionFieldRule() {
        return {
            pattern: /^[a-zA-Z0-9\s\-?]+$/,
            message:
                'Only letters (a-z, A-Z), numbers (0-9), spaces, hyphens (-), and question marks (?) are allowed.',
        }
    }

    public static answerFieldRule() {
        return {
            pattern: /^[a-zA-Z0-9\s\-\.]+$/,
            message:
                'Only letters (a-z, A-Z), numbers (0-9), spaces, hyphens (-), and periods (.) are allowed.',
        }
    }

    public static multipleMobileNumberValidation() {
        return {
            validator: (_: RuleObject, value: string) => {
                // Skip validation if no value is provided
                if (!value) {
                    return Promise.resolve()
                }

                // Split the input by commas and validate each number
                const numbers: string[] = value
                    .split(',')
                    .map((num) => num.trim())
                const invalidNumbers = numbers.filter(
                    (num) => !/^\d{10}$/.test(num),
                )
                if (invalidNumbers.length > 0) {
                    return Promise.reject(
                        'Each mobile number must be 10 digits and separated by commas without spaces.',
                    )
                }

                // Check if there's no extra space after the comma (valid format: number,number)
                if (!/^\d{10}(,\d{10})*$/.test(value)) {
                    return Promise.reject(
                        'Please ensure mobile numbers are separated only by commas, without spaces.',
                    )
                }

                return Promise.resolve()
            },
        }
    }

    public static multipleNumberRangeValidation() {
        return {
            validator: (_: RuleObject, value: string) => {
                // Skip validation if no value is provided
                if (!value) {
                    return Promise.resolve()
                }

                // Split the input by commas and validate each number
                const numbers: string[] = value
                    .split(',')
                    .map((num) => num.trim())
                const invalidNumbers = numbers.filter((num) => {
                    const numValue = Number(num)
                    return !/^\d+$/.test(num) || numValue < 1 || numValue > 9999
                })
                if (invalidNumbers.length > 0) {
                    return Promise.reject(
                        'Each number must be a positive integer between 1 and 9999, separated by commas without spaces.',
                    )
                }

                // Check if there's no extra space after the comma (valid format: number,number)
                if (!/^(\d{1,4})(,\d{1,4})*$/.test(value)) {
                    return Promise.reject(
                        'Please ensure numbers are separated only by commas, without spaces.',
                    )
                }

                return Promise.resolve()
            },
        }
    }

    public static PincodeValidationRule(fieldName: string) {
        return {
            pattern: /^[0-9]{6}$/,
            message: `${fieldName} must be a 6-digit pincode.`,
        }
    }
}

export default FormInputRules
