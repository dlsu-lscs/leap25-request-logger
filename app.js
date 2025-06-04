const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
    const requestDetails = {
        timestamp: new Date().toISOString(),
        ip: req.ip || req.connection.remoteAddress,
        method: req.method,
        originalUrl: req.originalUrl,
        path: req.path,
        protocol: req.protocol,
        hostname: req.hostname,
        headers: req.headers,
        query: req.query,
        cookies: req.cookies || {},
        userAgent: req.headers['user-agent'],
        referer: req.headers.referer || 'N/A'
    };

    console.log('Request Details:', JSON.stringify(requestDetails, null, 2));
    next();
});

app.get('/', (req, res) => {
    // Option 1: Get the referer header which indicates where the request came from
    const referer = req.headers.referer || 'Unknown';
    console.log('Request origin (referer):', referer);

    console.log('Request user-agent:', req.headers.userAgent);

    // Option 2: Get the origin header (useful for CORS requests)
    const origin = req.headers.origin || 'Unknown';
    console.log('Request origin (origin header):', origin);

    // Option 3: For info about the client's IP and hostname
    const ipAddress = req.ip || req.connection.remoteAddress;
    console.log('Client IP address:', ipAddress);

    return res.send('hehe');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
