import http from "node:http";
import { connection } from "./src/config/Database.js";

const processRequest = async (req, res) => {
    res.setHeader("Content-Type", "text/html");
    const { method, url } = req;
    
    switch (method) {
        case "GET":
            switch (url) {
                case "/citas":
                    const [rowsCitas, fieldsCitas] = await connection.query("SELECT * FROM citas");
                    res.end(JSON.stringify(rowsCitas));
                    break;
                case "/pacientes":
                    const [rowsPacientes, fieldsPacientes] = await connection.query("SELECT * FROM pacientes");
                    res.end(JSON.stringify(rowsPacientes));
                    break;
                case "/usuarios":
                    const [rowsUsuarios, fieldsUsuarios] = await connection.query("SELECT * FROM usuarios");
                    res.end(JSON.stringify(rowsUsuarios));
                    break;
            }
            break;
        case "POST":
            break;
        case "PUT":
            break;
        case "DELETE":
            break;
    }
}

const server = http.createServer(processRequest);

server.listen(3000, () => {
    console.log("Server listen on port http://localhost:3000");
})