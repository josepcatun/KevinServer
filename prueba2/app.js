const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer((req, res) => {
    console.log(`${req.method} solicita ${req.url}`);

    const htmlPages = [
        '/about',
        '/blog',
        '/categorias',
        '/contact',
        '/furniture',
        '/',
        '/login',
        '/principaluser',
        '/registro'
    ];
    if (htmlPages.includes(req.url) || req.url.endsWith('.html')) {
        let filePath = './public_html'; // Aquí cambiamos 'public_html' por 'public'
        if (req.url === '/') {
            filePath += '/index.html';
        } else {
            filePath += req.url;
            if (!req.url.endsWith('.html')) {
                filePath += '.html';
            }
        }
        
        fs.readFile(filePath, 'utf-8', (err, html) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('404 Not Found');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(html);
        });
    } else if (req.url.match(/.css$/)) {
        const reqPath = path.join(__dirname, 'public_html', req.url);
        const fileStream = fs.createReadStream(reqPath, 'utf-8');
    
        res.writeHead(200, { 'Content-Type': 'text/css' });
        fileStream.pipe(res);
    
    } else if (req.url.match(/.jpg$/)) {
        const reqPath = path.join(__dirname, 'public_html', req.url);
        const fileStream = fs.createReadStream(reqPath);
    
        res.writeHead(200, { 'Content-Type': 'image/jpeg' }); // Nota: Corregido a 'image/jpeg'
        fileStream.pipe(res);
    
    } else if (req.url.match(/.png$/)) {
        const reqPath = path.join(__dirname, 'public_html', req.url);
        const fileStream = fs.createReadStream(reqPath);
    
        res.writeHead(200, { 'Content-Type': 'image/png' });
        fileStream.pipe(res);
    
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 ERROR');
    }

}).listen(8282);

console.log('Servidor iniciado...');