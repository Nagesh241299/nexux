/* common application wide utility functions are placed here. */

import moment, { Moment } from 'moment'
import LocalStorageUtil from './LocalStorageUtil'
import { LocalStorageConstants } from '@/constants/Application/LocalStorageConstants'

type FormData = { [key: string]: any }

export class General {
    public static getPagination(
        page: number,
        pageSize: number,
    ): { limit: number; offset: number } {
        const offset = (page - 1) * pageSize
        return { limit: pageSize, offset }
    }

    public static titleCaseFunction(data: string) {
        return data
            ?.toString()
            .replace(/(^\w)|(\s+\w)/g, (letter) => letter?.toUpperCase())
    }

    public static truncateText = (
        text: string,
        maxLength: number = 15,
    ): string => {
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text
    }

    public static inputWhiteSpaceRemove(value: any) {
        return value.replace(/^\s+/g, '')
    }

    public static firstLetterCapital(data: string) {
        return data?.charAt(0).toUpperCase() + data?.slice(1)
    }

    public static disableFutureDate = (current: Moment | null): boolean => {
        return !!current && current > moment().endOf('day')
    }

    public static searchFilterOnSelect = (input: any, option: any) => {
        const children = option?.children

        if (typeof children === 'string' || typeof children === 'number') {
            return (
                children
                    .toString()
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
            )
        }

        return false
    }

    public static convertDateToAPIFormat = (date: Moment) => {
        return moment(date).format('YYYYMMDD')
    }

    public static convertDateStringToMoment = (
        dateString: string | undefined | null,
    ) => {
        if (!dateString) return null

        return moment(dateString, 'YYYYMMDD')
    }

    /* converts file object to base64 image the return value can be directly consumed by src attributes in img tags.*/
    public static convertFileToBlobUrl = async (file: any): Promise<string> => {
        return new Promise((resolve, reject) => {
            try {
                const blobUrl = URL.createObjectURL(file)
                resolve(blobUrl)
            } catch (error) {
                reject(error)
            }
        })
    }

    /* converts base 64 or blob data to file object */
    public static async blobUrlToFile(
        dataurl: string,
        fileName: string,
        fileExtension: string,
    ) {
        const response = await fetch(dataurl)
        const blob = await response.blob()
        return new File([blob], fileName, { type: fileExtension })
    }

    public static getGUID = () => {
        return Math.random()
    }

    public static trimFormValues = <T extends FormData>(formData: T): T => {
        const trimmedValues: Partial<T> = {}

        Object.keys(formData).forEach((key) => {
            const value = formData[key]
            trimmedValues[key as keyof T] =
                typeof value === 'string' ? value.trim() : value
        })

        return trimmedValues as T
    }

    public static numberWithCommas(
        x: number | string | null | undefined,
    ): string {
        if (x === null || x === undefined) return '0'

        /* Ensure we are working with a string version of the number */
        const numStr = x.toString()

        /* Split the number by the decimal point, if it exists */
        const [integerPart, decimalPart] = numStr.split('.')

        /* If the integer part is longer than 3 digits, format it with commas for thousands */
        const formattedInteger =
            integerPart.length > 3
                ? integerPart
                      .substring(0, integerPart.length - 3)
                      .replace(/\B(?=(\d{2})+(?!\d))/g, ',') +
                  ',' +
                  integerPart.substring(integerPart.length - 3)
                : integerPart

        /* Return the formatted number, adding back any decimal part if it exists */
        return decimalPart
            ? `${formattedInteger}.${decimalPart}`
            : formattedInteger
    }

    public static parseDate = (dateStr: string | null) =>
        dateStr ? moment(dateStr, 'DD-MM-YYYY HH:mm') : null

    /* Disable dates after today */
    public static disabledDate = (current: moment.Moment) => {
        return current && current > moment().endOf('day')
    }

    /* Disable times after the current time if the selected date is today */
    public static disabledRangeTime = (
        date: Moment | null,
        type: 'start' | 'end',
    ) => {
        if (date && date.isSame(moment(), 'day')) {
            const currentHour = moment().hour()
            const currentMinute = moment().minute()
            return {
                disabledHours: () =>
                    Array.from({ length: 24 }, (_, i) => i).filter(
                        (hour) => hour > currentHour,
                    ),
                disabledMinutes: (selectedHour: number) =>
                    selectedHour === currentHour
                        ? Array.from({ length: 60 }, (_, i) => i).filter(
                              (min) => min > currentMinute,
                          )
                        : [],
            }
        }
        return {}
    }

    public static validateDateRange(
        dateRange: { fromDate: string | null; toDate: string | null },
        dateTimeformat = 'DD-MM-YYYY HH:mm',
    ) {
        try {
            /* Ensure both dates are provided */
            if (!dateRange.fromDate || !dateRange.toDate) {
                throw new Error("Both 'From' and 'To' dates must be provided.")
            }

            const now = moment()

            const fromDate = moment(dateRange.fromDate, dateTimeformat)
            const toDate = moment(dateRange.toDate, dateTimeformat)

            /* Validate if 'fromDate' and 'toDate' are not in the future */
            if (fromDate.isAfter(now) || toDate.isAfter(now)) {
                throw new Error(
                    'Future dates and times cannot be selected. Please choose valid dates and times.',
                )
            }

            /*  Validate if 'toDate' is greater than 'fromDate' */
            if (!toDate.isSameOrAfter(fromDate)) {
                throw new Error(
                    "'To' date and time must be after 'From' date and time.",
                )
            }
        } catch (error) {
            throw error
        }
    }

    public static formatTime = (text: string | null): string => {
        return text ? moment(text, 'DD-MM-YYYY HH:mm').format('hh:mm A') : '-'
    }

    public static getFormattedDateRange = (
        selectedDate?: string,
    ): { fromDate: string; toDate: string } => {
        const currentDate = moment()
        const selectedDateMoment = selectedDate
            ? moment(selectedDate, 'YYYY-MM-DD')
            : null

        if (!selectedDateMoment) {
            return { fromDate: '-', toDate: '-' }
        }

        const isToday = selectedDateMoment.isSame(currentDate, 'day')
        const fromDate = selectedDateMoment
            .startOf('day')
            .format('YYYY-MM-DD HH:mm:ss')
        const toDate = isToday
            ? currentDate.format('YYYY-MM-DD HH:mm:ss')
            : selectedDateMoment.endOf('day').format('YYYY-MM-DD HH:mm:ss')

        return { fromDate, toDate }
    }

    public static isStaticContentView(): boolean {
        const value = LocalStorageUtil.localStorageGetItem(
            LocalStorageConstants.STATIC_CONTENT,
        )
        return value === 'true'
    }

    public static formatSnakeCaseToTitle = (str: string): string => {
        return str
            .split('_')
            .map(
                (word) =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
            )
            .join(' ')
    }

    public static getNextOffset = (
        total: number,
        limit: number,
        offset = 0,
    ): boolean => {
        return offset + limit < total || offset < total
    }

    public static formatFilterMessage(
        label: string,
        totalProducts: number,
        filters: Record<string, string>,
    ): JSX.Element {
        return (
            <>
                <strong>
                    {totalProducts} {label}
                </strong>{' '}
                found
                {Object.entries(filters).length > 0 && `, filtered by:`}{' '}
                {Object.entries(filters).map(([key, value], index, array) => (
                    <span key={key}>
                        {General.formatSnakeCaseToTitle(key)}:{' '}
                        <strong>{value}</strong>
                        {index < array.length - 1 ? ', ' : ''}
                    </span>
                ))}
                .
            </>
        )
    }

    public static splitAndFormatOptions = (data: any[], key: string) => {
        return (
            data?.flatMap((item) =>
                (Array.isArray(item[key]) ? item[key] : [item[key]]).flatMap(
                    (value) =>
                        value
                            ?.split(',')
                            .map((v: any) =>
                                v.trim().replace(/^['"]+|['"]+$/g, ''),
                            )
                            .filter(Boolean)
                            .map((v: any) => ({
                                value: v,
                                label: v,
                            })),
                ),
            ) || []
        )
    }
}
