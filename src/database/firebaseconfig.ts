import admin from 'firebase-admin'

const serviceAccount = {
    type: 'service_account',
    project_id: 'pynton-platform',
    private_key_id: '25fccfb15fdd8c2aec7df9e22bc25ac331d71571',
    private_key:
        '-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDfKqpXBtw2iCvs\n8vqFKxUTWUYLXivktX89wCBkJXUiUJ5kWEZGJRRcCKE2vgmDvcp+wfe/+IqGXgqT\nEixLF6QB907+1zx4UgUc90mV4bQexqiNZOJWplmCrY4iAyfb2nbSHItuIN1q8iO4\nhpEpl5v4TeIMrIJBT7FfPIuVz2nNmCHMr2D14onqQsGtcG/cBzMsYryfojmmDup2\nJd1gCEuCcK2wzRjS9UkoumjoUHqiXEm5ojkkoCpf6E7gN5/8huZxeG+PPU+3xvka\nYOgJwjABFchj5hwbPDJcufZ8XL3ylLMLM5MIONj2EUxUbD6nOiWs3lOXZ9PgDn1p\n2uOXGrFZAgMBAAECggEAD0NtZtof4+Vsnq5QMt07WelOVH72gNQmjaBHPt4+fJA3\nwxx0Av5sfe5zq0k0YKOxlrmYwrMis1W5gq1YpPKrG5zQ9PZe6wpOEfj6WhNXtM6o\nztHmdp92Sg0phltBpcRzgcOkyC2cg0DoL0nZ4ha92s3l3vDKEGI9WwqKr/6BiaeE\nPN4aM0AZy3umY2OPltXwBC2DlezgBeE8ppWCSrrAGETFEJ1qp+dFJXJVjLOVCw7a\nttNTEM2Zu7UXsaHVDvxDEIMSQSywZqSSXKuxkxBbDcYkx/vvp1O1vwx5cmAJJHOg\nYqqtYgd5EKO5sN6/z6ANabcGi2i5OfJsn47qnsfTMQKBgQD0qc5+LluEqeQoSU8u\nQ+Q11bsW6UCsFmyvYlUpnWrDnc7MKC6AopjTwxHEJOE0pTthBsUrV+UuU++xDES5\no2iGZH4lUYZlZgtgua5HIQYeVIAZTvKJthBpGrsvKBZlrwopOOFhN+m5oz4LUtVU\nq5QhHbY2dswuW4zARsql4/a5SQKBgQDpgd2l4mcy9xyMd5nfQmxm6WHrUmS5xeeF\nV1PVJns+qM65T8PWfNMqC8zlYl8W5DY/FA14XVDRPNHK8PBpYcY56ZMNCbz3Barj\nt3+iaj+g10IIQX52N26A9bzBufqgdHFW8F2oN7vheKj1HMdMpvOCoIllunQ3hCQn\n5UlqL7THkQKBgQDGwYu2hgJi64EmGSfx9cVW1qJ+Ik8ffbgdYky82dz5vSFaSOo+\nJdjxbu7n4O3yzqhGUjGq3GSaFiYKNmU+SbmIM+smdewwQ43Krg0eS32k9hB6fuAZ\nb4Y1XDnkPTS0tlYS1tqBF+MPo8WrfUdA2YIkxPZZmHiW0FivetL1oRO1wQKBgQC+\nmvtKhVyoBX6QSrCXxaim+KqtZDxESH+MIJSV0SuZIkJckffSBWJ5V9iRBZOJJBAD\nvWKhdcqagYLenX4hB2a/ryIR6nkNStsLtqXA9emqaQvFoXCRHv5c1jqWCDHE+Efs\nJ5jLz3LVwaBpNGya7UyovFJrb5+eEYdR6Z/bxcVTgQKBgQCQo8oVRxY7R+QP2JdF\ntssHyTKveoSgVdV/tqJ4z7KsneMxzFK2+CBfnjgS7Gr/XSpMtv4gSkvP6720YBPh\nCJpbACPKcWNHzcOaBNc072UFigrQMhrHdXSJOw8s2VWTgpWny9Ry6lzz8RZJcZZY\nqVwbcw+gFb6NwGkJlnFclmn+Dw==\n-----END PRIVATE KEY-----\n',
    client_email: 'firebase-adminsdk-ar4ig@pynton-platform.iam.gserviceaccount.com',
    client_id: '113692270465842013404',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url:
        'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ar4ig%40pynton-platform.iam.gserviceaccount.com',
} as admin.ServiceAccount

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://shiila-works-management-default-rtdb.asia-southeast1.firebasedatabase.app',
})

export const auth = admin.auth()
export const firestore = admin.firestore()
