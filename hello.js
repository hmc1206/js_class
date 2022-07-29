const http = require('http');

const server = http.createServer();

const fs = require('fs');

server.on("connection", () => {
    console.log("서버 연걸함");
});
server.on("request", (request, response) => {
    let file = fs.createReadStream("./index.html");
    file.on("open", () => {
        file.pipe(response);
    })
})

server.listen(50000);