import { Tooltip } from 'antd'
import { General } from './General'
import moment from 'moment-timezone'

export class TableHelper {
    public static getValue = (text: string | number | null | undefined) => {
        if (text === null || text === undefined || text === 'null') {
            return ''
        }
        return text
    }

    public static getFilterDataSource = (
        data: any[],
        keys: string[],
        searchedText: string | null | undefined,
    ) => {
        const searchText = searchedText?.toLowerCase() || ''

        /* Check if data and keys are arrays */
        if (!Array.isArray(data) || !Array.isArray(keys)) {
            return []
        }

        return data
            ?.filter((item: any) =>
                keys.some((key) => {
                    const value = item?.[key]
                    return String(value)?.toLowerCase()?.includes(searchText)
                }),
            )
            ?.map((item: any, index: number) => {
                return {
                    ...item,
                    sr_no: index + 1,
                }
            }) as any
    }

    public static valueCompare = (key: string | undefined | null) => {
        if (!key) return () => 0

        return (a: { [key: string]: any }, b: { [key: string]: any }) => {
            const aValue = a?.[key]
            const bValue = b?.[key]

            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return aValue.localeCompare(bValue)
            } else if (
                typeof aValue === 'number' &&
                typeof bValue === 'number'
            ) {
                return aValue - bValue
            } else if (
                typeof aValue === 'boolean' &&
                typeof bValue === 'boolean'
            ) {
                return aValue === bValue ? 0 : aValue ? -1 : 1
            }

            // Handle null or undefined values by treating them as smaller
            if (aValue == null && bValue == null) return 0
            if (aValue == null) return -1
            if (bValue == null) return 1

            return 0
        }
    }

    public static dateSorter = (key: string) => {
        return (a: { [key: string]: any }, b: { [key: string]: any }) => {
            const dateA = General.parseDate(a[key])
            const dateB = General.parseDate(b[key])

            if (!dateA && !dateB) return 0 // Both are null or empty
            if (!dateA) return -1 // a is null or empty
            if (!dateB) return 1 // b is null or empty

            return dateA.valueOf() - dateB.valueOf()
        }
    }

    public static digitSorter = (key: string) => {
        return (a: { [key: string]: any }, b: { [key: string]: any }) => {
            const valueA = Number(a[key])
            const valueB = Number(b[key])

            if (isNaN(valueA) && isNaN(valueB)) return 0 // Both are invalid numbers
            if (isNaN(valueA)) return -1 // a is not a valid number
            if (isNaN(valueB)) return 1 // b is not a valid number

            return valueA - valueB
        }
    }

    public static parseTime(
        timeString: string | undefined | null,
    ): Date | null {
        if (!timeString) return null
        const momentTime = moment(timeString, ['HH:mm', 'hh:mm A'], true) // Add formats as needed
        return momentTime.isValid() ? momentTime.toDate() : null
    }

    public static timeSorter = (key: string) => {
        return (a: { [key: string]: any }, b: { [key: string]: any }) => {
            const timeA = this.parseTime(a[key])
            const timeB = this.parseTime(b[key])

            if (!timeA && !timeB) return 0 // Both are null or invalid
            if (!timeA) return -1 // a is null or invalid
            if (!timeB) return 1 // b is null or invalid

            return timeA.valueOf() - timeB.valueOf()
        }
    }

    public static renderText = (text: string | number) => {
        return (
            <div className="wordWrapWordBreak">
                {TableHelper.getValue(text)}
            </div>
        )
    }

    public static renderNumberValue = (text: string | number) => {
        return <div className="text-right">{TableHelper.getValue(text)}</div>
    }

    public static renderTextContainer = (text: string) => {
        const fullText = String(TableHelper.getValue(text))

        const truncatedText =
            fullText.length > 50 ? `${fullText.slice(0, 50)}...` : fullText

        return (
            <Tooltip title={fullText}>
                <div className="wordWrapWordBreak">{truncatedText}</div>
            </Tooltip>
        )
    }
}
