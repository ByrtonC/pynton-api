import crypto from 'crypto'
import { caches } from 'src/caches'

export function randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min)
}

export function randomPrimeNumber(): number {
    const ranNumber = randomNumber(0, caches.primeNumbersLength - 1)
    return caches.primeNumbers[ranNumber]
}

export function generateKeyPair() {
    return crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicExponent: 0x10001,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem',
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
        },
    })
}

export function encrypt(data: string, publicKey: string) {
    const buffer = Buffer.from(data)
    const encrypted = crypto.publicEncrypt({ key: publicKey, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING }, buffer)
    return encrypted.toString('base64')
}

export function decrypt(data: string, privateKey: string) {
    const buffer = Buffer.from(data, 'base64')
    const decrypted = crypto.privateDecrypt(
        { key: privateKey, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING },
        buffer,
    )
    return decrypted.toString()
}

// let message = 'Hello, World!'
// const { publicKey, privateKey } = generateKeyPair()

// let encrypted = encrypt(message, publicKey)
// let decrypted = decrypt(encrypted, privateKey)
// console.log('Decrypted message: ' + decrypted)
