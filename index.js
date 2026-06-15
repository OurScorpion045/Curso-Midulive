import http from "node:http";
import fs from "node:fs";
import { connection } from "./src/config/Database.js";

const processRequest = async (req, res) => {
    res.setHeader("Content-type", "text/html");
    let url = req.url;
    let method = req.method;

    switch (url) {
        case "/":
            try {
                res.statusCode = 200;
                res.end("</h1>Main page</h1>");
                break;
            } catch (err) {
                res.statusCode = 400;
                console.log("Error at mainPage: " + err);
            }
        case "/users":
            try {
                res.statusCode = 200;
                res.end("<h1>Users page</h1>");
                break;
            } catch (err) {
                res.statusCode = 400;
                console.log("Error at userPage: " + err);
            }
        case "/admin":
            try {
                res.statusCode = 200;
                res.end("<h1>Admin page</h1>");
                break;
            } catch (err) {
                res.statusCode = 400;
                console.log("Error at adminPage: " + err);
            }
        case "/database":
            try {
                res.statusCode = 200;
                const [results, fields] = await connection.query("SELECT * FROM futbolistas")
                console.log(results);
                res.end(JSON.stringify(results));
                break;
            } catch (err) {
                res.statusCode = 400;
                console.log("Error at databasePage" + err)
            }
        case "/image":
            try {
                res.statusCode = 200;
                await fs.readFile("./resources/Captura-entrenamiento.png", (err, image) => {
                    if (err) {
                        res.statusCode = 500;
                        console.log("<h1>Internal server error</h1>");
                    } else {
                        res.setHeader("Content-type", "image/png");
                        res.end(image);
                    }
                });
                break;
            } catch (err) {
                res.statusCode = 400;
                console.log("Error at imagePage" . err);
            }
        case "/favicon.ico":
            res.statusCode = 200;
            break;
        default:
            res.statusCode = 404;
            console.log("Error, Url not found");
            break;
    }
}

const server = http.createServer(processRequest) 

server.listen(3000, () => {
    console.log("Server running on port 3000");
});