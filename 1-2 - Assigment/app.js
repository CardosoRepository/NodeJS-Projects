const http = require('http')

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>')
        res.write('<head><title>Welcome to "/" path</title></head>')
        res.write('<body><form action="/create-user" method="POST"><input type="text" name="user"><button type="submit">Send</button></form></body>')
        res.write('</html>')
        return res.end();
    }

    if (url === '/users') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>')
        res.write('<head><title>This is the Users route</title></head>')
        res.write('<body><ul><li>User 1</li><li>User 2</li><li>User 3</li></ul></body>')
        res.write('</html>')
        return res.end();
    }

    if (url === '/create-user' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk)
        });
        
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            console.log(message);
            res.statusCode = 302;
            res.setHeader('Location', '/')
            res.end();
        })
    }
})

server.listen(3000);