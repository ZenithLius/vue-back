const http = require('http');
const url = require('url');

const users = [
    { id: 1122, name: "1" },
    { id: 2133, name: '2' }
];

console.log('Attempting to start server...');

const server = http.createServer((req, res) => {
    // Set headers to allow CORS and return JSON
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Parse URL to ignore query strings and trailing slashes
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    // Normalize path (remove trailing slash for comparison if needed, though exact match is safer for APIs usually)
    // Here we allow /api/user or /api/user/
    if (pathname === '/api/user' || pathname === '/api/user/') {
        res.end(JSON.stringify(users));
    } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: 'Not Found' }));
    }
});

server.on('error', (e) => {
    if (e.code === 'EADDRINUSE') {
        console.error('Address in use, retrying...');
        setTimeout(() => {
            server.close();
            server.listen(3000);
        }, 1000);
    } else {
        console.error('Server error:', e);
    }
});

server.listen(3000, () => {
    console.log('后端API接口服务器已经启动在3000端口');
});