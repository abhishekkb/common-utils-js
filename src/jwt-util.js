// Utility to decode a Base64-encoded string and parse it into JSON
export function decodeBase64ToJson(base64String) {
    try {
        const decodedString = atob(base64String);
        return JSON.parse(decodedString);
    } catch (error) {
        throw new Error("Invalid Base64 or JSON format.");
    }
}

// Utility to extract the JWT field from JSON and decode it using jwt-decode
import jwtDecode from 'https://cdn.jsdelivr.net/npm/jwt-decode/build/jwt-decode.esm.js';

export function decodeJwtField(jsonString) {
    try {
        const jsonObject = JSON.parse(jsonString);
        const jwt = jsonObject.jwt;

        if (!jwt) {
            throw new Error("JWT field not found.");
        }

        // Decode JWT using jwt-decode
        return jwtDecode(jwt);
    } catch (error) {
        throw new Error("Error decoding JWT or invalid input.");
    }
}
