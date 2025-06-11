import forge from 'node-forge'

export class RSAEncryption {
    public static publicKey = import.meta.env.VITE_APP_RSA_PUBLIC_KEY + ''

    public static encrypt(message: string) {
        try {
            const publicKey = forge.pki.publicKeyFromPem(
                RSAEncryption.publicKey,
            )

            const encryptedBytes = publicKey.encrypt(message, 'RSA-OAEP', {
                md: forge.md.sha256.create(),
            })

            /* Convert the encrypted bytes to a Base64-encoded string */
            const encryptedBase64 = forge.util.encode64(encryptedBytes)
            return encryptedBase64
        } catch (error) {
            console.log('error encrypting message', error)
        }
    }
}

/* base64 encoder/decoder for strings (used in localstorage encryption) */
export class Base64StringEncoding {
    private static generateRandomKey(keyLength: number): string {
        const charset =
            'ABCDEFGHIJKLMNOPQRSTUVWCUSTOMERabcdefghijklmnopqrstuvwcustomer0123456789!@#$%^&*()-_=+[]{}|;:\'",.<>/?'
        let key = ''

        for (let i = 0; i < keyLength; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length)
            key += charset.charAt(randomIndex)
        }

        return key
    }

    public static encode(input: string): string {
        return btoa(input)
    }

    public static decode(encryptedInput: string): string {
        return atob(encryptedInput)
    }
}
