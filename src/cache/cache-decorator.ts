export function CacheOutput(cacheKey: string, ttl: number) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        const cache: { [key: string]: { value: any, expiry: number } } = {};

        descriptor.value = async function (...args: any[]) {
            const currentTime = Date.now();
            const cacheEntry = cache[cacheKey];
            if (cacheEntry && currentTime < cacheEntry.expiry) {
                return cacheEntry.value;
            } else {
                const result = await originalMethod.apply(this, args);
                cache[cacheKey] = { value: result, expiry: currentTime + ttl };
                return result;
            }
        };

        return descriptor;
    };
}
