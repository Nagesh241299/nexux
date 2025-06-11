class LocalStorageUtil {
    public static localStorageSetItem(key: string, value: string | object) {
        const formattedKey = btoa(key)
        const formattedValue = btoa(JSON.stringify(value))

        localStorage.setItem(formattedKey, formattedValue)
    }

    public static localStorageGetItem(key: string) {
        const encryptedKey = btoa(key)
        const encryptedValue = localStorage.getItem(encryptedKey)

        if (!encryptedValue) return null

        const decryptedValue = atob(encryptedValue)
        if (decryptedValue === 'undefined') return null
        return JSON.parse(decryptedValue) || false
    }

    public static localStorageRemoveItem(key: string) {
        const encryptedKey = btoa(key)
        localStorage.removeItem(encryptedKey)
    }

    public static localStorageUpdateData(key: string, value: string | object) {
        const formattedKey = btoa(key)

        // Retrieve and decode existing data
        const existingData = localStorage.getItem(formattedKey)
        let parsedData = {}

        if (existingData) parsedData = JSON.parse(atob(existingData))

        // Merge old data with the new value
        const updatedData = {
            ...parsedData,
            ...(typeof value === 'object' ? value : { newValue: value }),
        }

        // Encode and store the updated data
        const formattedValue = btoa(JSON.stringify(updatedData))
        localStorage.setItem(formattedKey, formattedValue)
    }
}

export default LocalStorageUtil
