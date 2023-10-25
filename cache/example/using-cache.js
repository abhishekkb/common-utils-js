import { Cache } from '../cache.js';
const cache = new Cache();

export const usingCache = () => {
    cache.put("Employees", "id-001", {a: 1, b: 2});
    cache.put("Employees", "id-002", {a: 2, b: 14});
    cache.put("Employees", "id-003", {a: 3, b: 541});
    cache.put("Employees", "id-004", {a: 123, b: 124});
    cache.put("Addresses", "id-004", {d: 123123, e: 124});
    cache.put("Addresses", "id-004", {d: 115623, e: 124});
    console.log(`Cache Employees = ${JSON.stringify(cache.get("Employees"))}`)
    console.log(`Cache Addresses = ${JSON.stringify(cache.get("Addresses"))}`)
    console.log(`Cache = ${JSON.stringify(cache.get())}`)
}
