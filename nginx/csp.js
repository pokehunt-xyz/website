function generateNonce(r) {
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);

    return Buffer.from(bytes).toString('base64');
}

export default {
    generateNonce
};