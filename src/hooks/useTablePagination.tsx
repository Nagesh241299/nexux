import { TablePaginationConfig } from 'antd'
import { useState } from 'react'

const useTablePagination = (rowLength: number) => {
    /* CONSTANTS */

    const showTotal = (total: number, range: number[]) => (
        <span>
            {range[0]}-{range[1]} of
            <span style={{ margin: '0 5px', fontWeight: 'bolder' }}>
                {total}
            </span>
            records
        </span>
    )

    /* STATE */
    const [pagination, setPagination] = useState<TablePaginationConfig>({
        current: 1,
        pageSize: 10,
        total: rowLength,
        showSizeChanger: true,
        pageSizeOptions: [10, 20, 50, 100],
        showTotal: showTotal,
    })

    /* HANDLERS */
    const handleResetPagination = () => {
        setPagination({
            current: 1,
            pageSize: pagination?.pageSize,
            total: 0,
            showSizeChanger: true,
            pageSizeOptions: [10, 20, 50, 100],
            showTotal: showTotal,
        })
    }

    const handleChangePagination = (pagination: TablePaginationConfig) => {
        setPagination({ ...pagination, showTotal: showTotal })
    }

    /* called when data is filtered, to update state with new size of filtered rows */
    const handleChangeTotalSize = (rowLength: number) => {
        setPagination((prevState) => {
            return { ...prevState, total: rowLength }
        })
    }

    /* EFFECTS */
    return {
        pagination,
        handleChangePagination,
        handleChangeTotalSize,
        handleResetPagination,
    }
}

export default useTablePagination
