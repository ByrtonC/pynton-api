export interface PrivateAndPublicKeyType {
    n: number
    private: number
    public: number
}

class DynamicCacheClass {
    ppKeys: PrivateAndPublicKeyType[] = []

    addPPKey(key: PrivateAndPublicKeyType) {
        this.ppKeys.push(key)
    }
}

export const dynamicCache = new DynamicCacheClass()
