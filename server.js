"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
//import cors from "cors";
//import { loadRouter } from "./event/LoadRouter";
const SensorRouter_1 = require("./sensor/infrastructure/SensorRouter");
const Websocketrouter_1 = require("./websocket/Websocketrouter");
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.server = http_1.default.createServer(this.app);
        this.io = null;
        this.configure();
    }
    configure() {
        return __awaiter(this, void 0, void 0, function* () {
            this.app.use(express_1.default.json());
            this.app.use("/sensores", SensorRouter_1.sensorRouter);
            // this.app.use(cors()); // responde solicitudes desde cualquier origen, lo habilita
            //this.app.use("/load", loadRouter);
        });
    }
    socketServer() {
        this.io = new socket_io_1.Server(this.server, {
            cors: { origin: "*" } // Permitir conexiones desde cualquier origen en el socket.io
        });
        // Utiliza la función handleWebSockets para manejar los eventos de los WebSockets.
        (0, Websocketrouter_1.handleWebSockets)(this.io);
    }
    start() {
        this.server.listen(3010, () => {
            console.log(`Server online in port 3010`);
        });
    }
}
const app = new App();
app.socketServer();
app.start();
