import admin from 'firebase-admin'

const serviceAccount = {
    type: 'service_account',
    project_id: 'pynton-platform',
    private_key_id: 'd591933abfa12667b810934e7f6b99635076063c',
    private_key:
        '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDTLCtCYg47KpjZ\n9axvaOMudjlqG5DGNrGli2inqpdhjm2H6ovnpI6NDQMX40i9khncjeRt7Fb1Y/15\ncvX6GBW2ioLliZNRzZ40OSTGhsDD1Sqs8IGuIsE6i/N130cgp4QstWpdMcvRpS6Q\nRByGABQume6f8aMI8rzP8zsDMag3QgKmn97mSbOeFcjuHXuoshdqqmr8Tz1HDh+X\nguVLdcpG4XKDrUTXegAkbtt4JXsqdd1FJvXPlEQP4lWRcMu40orL6ngH1X7CKNSF\n4H3IBSbFcZhzQ2xkcA7et9UeP4SUDxdCjIi+P78JKA4m5yWKy7DLVHiyLqb0POAZ\nWiN7AFIJAgMBAAECggEAD9/gBCJgKL855Jeo7eqb+moJhKIcGuRxbA0L8d+7d8pX\nzkn52LDohO6zmvP7a8HMByYVBBTqUBHjVAIJ/vIYzsNAlg4GqLV89TbO/owSeV5A\n0iWV0A/9h9/NrmCZpZkmMOC15VnZFTJWSuLN5J5kpgCtHTGyZHmv6y+BEgtFdprR\nFf92TYl3+MOAha/Gb710yTeH6aSHJjTs6Intmk/9oMze11cwsyc4y+ygJuW+Xw+6\nrCRRsfcM0hnDo4f+m5ZO44sZYgxJXLON0ZASFB4hQvPq+K31kkgPTLBxbLZ0x2Xe\nnHP9FEoR4Vw8+LW7UlAWyUXwRDIKSxYPm+a2NSx3cQKBgQD35IPGqhTf7PgFspk4\nrSF61FbRS6B7KcYxDyUS06hS2lxIweYenpk48we12ZZo7HfCKaMahknJS//LZGhl\n5LWGE7EK1J1zszMk2tQfbft8e5sdP0E7OOLxdOQ5hey8/08s6VnE0A3SZFoS5cgZ\nFJjg2IP9y6u6v0qAP+1NSoY0uQKBgQDaFDbuQYgJujK1SkwrDZn6ABlvPaCuQ/aV\nvK6J4h6fQe/at6m/2DgBn686YJEE1TzEXoPEgw3WX7Jbp3FyIgka4626pIIJOjW8\nSftFo+XvKRXpeBiZ0rviK20rstSYchORcyEBZpP4CkmuOPwuH+gFIgERyu+Ts5f0\nt62kLMP/0QKBgGFlKhUi/AKi4yux6Rtogm/0/4tJ0GqzlgfucF1+RXMQEhQQAq7j\nF0ZVziC3ta3RwpfJriicvF7Xek/aSl5GRr+/+t5LfPVZYe3IAHG8z4MwOVh7YtC2\n4AuIJqcnJEV5dg0qPbfjGpsgDHfCSiT4f7xPtURBAl7kC4xqEX09m48ZAoGAYp9d\nsCYGpY+FOyNciuPdzIea+Qm/zs+BhnoL3ONbwd4J4LnKlK3tth5HGnltW+grUQsF\nQCucaGRivrxcu6bUw0pP2OZowE+I2ZwDfJ0AcUX9WNYtGfOJcGD/QBHhvwdn/hE4\nze9b34KXi6jNsvZO8XNNVISYEA3aHJusdWChSuECgYEA0INbk/+iTvnyGLa9Nz+R\nEwJWwfkFlhvJGU0H92Dy1CGo5nl/Bar1zkFTbwvJXqFhk7fNBfpBDTJ+nwyfWF4p\nJs7ENVQn56nE7/+UQjkIh2gv+AGYQLRNkwxMr6k1fbiWxvyyIfnCev7RIcvEPTWS\nAQ00X6kkENGjUESePOTO1vA=\n-----END PRIVATE KEY-----\n',
    client_email: 'firebase-adminsdk-pi3ag@pynton-platform.iam.gserviceaccount.com',
    client_id: '111550458219758956599',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url:
        'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-pi3ag%40pynton-platform.iam.gserviceaccount.com',
} as admin.ServiceAccount

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://pynton-platform-default-rtdb.asia-southeast1.firebasedatabase.app',
})

export const auth = admin.auth()
export const firestore = admin.firestore()
