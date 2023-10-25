const _cache = {};

export class Cache {
    constructor(){}

    get(cacheName, cacheKey){
        if (cacheName === undefined || cacheName === null ) {
            return _cache;
        }
        if(cacheKey === undefined || cacheKey === null) {
            return _cache[cacheName];
        }
        return _cache[cacheName] !== undefined ? _cache[cacheName][cacheKey] : undefined;
    }

    put(cacheName, cacheKey, cacheValue) {
        if (cacheName === undefined || cacheName === null || cacheKey === undefined || cacheKey === null) {
            return;
        }
        if(_cache[cacheName] === undefined) {
            _cache[cacheName] = {};
        }
        _cache[cacheName][cacheKey] = cacheValue;

    }
}
