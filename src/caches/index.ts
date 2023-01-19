import { staticCache } from './static'
import { dynamicCache } from './dynamic'

export const caches = {
    ...staticCache,
    privateAndPublicKeys: dynamicCache.ppKeys,
    addPrivateAndPublicKeys: dynamicCache.addPPKey,
}
