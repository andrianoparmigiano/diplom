// import http from "http";
// import fs from "fs";

// http.createServer(function (request, response) {
//     response.setHeader("Access-Control-Allow-Origin", "*");
//     response.setHeader("Access-Control-Allow-Methods", "GET, POST");
//     response.setHeader("Access-Control-Max-Age", 2592000);
//     response.setHeader(
//         "Access-Control-Allow-Headers",
//         "X-Requested-With, content-type"
//     );
//     response.setHeader("Content-Type", "application/json");
//     response.setHeader("Accept", "application/json");
//     response.writeHead(200)
//     let data = '';
//     request.on("data", (chunk) => {
//         data += chunk;
//     });
//     request.on("end", () => {
//         console.log("Data: ", data);
//         response.end(JSON.stringify(data));
//     });

//     // console.log("Url: " + request.url);
//     // console.log("Тип запроса: " + request.method);
//     // console.log("User-Agent: " + request.headers["user-agent"]);
//     // console.log("Все заголовки");
//     // console.log(request.headers);
//     const d = JSON.stringify({
//         name :      1   ,
//     });
//     console.log(d);
//     if(request.method === "GET")
//         response.end(JSON.stringify(d));
// }).listen(8000);
