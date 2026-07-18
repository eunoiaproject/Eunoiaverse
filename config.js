// config.js
const sendVerificationCode = (username) => {
    generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(`Verification code sent to ${username}: ${generatedCode}`);
};
export { sendVerificationCode };

// logger.js
export function logger(message) {
    console.log(message);
}
export function log(message) {}
export function logError(message) {}
export function logWarning(message) {}
export function logInfo(message) {}
export function logDebug(message) {}
export function logTrace(message) {}
export function logFatal(message) {}

