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
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleWebSockets = void 0;
const MysqlSensorRepository_1 = require("../sensor/infrastructure/MysqlSensorRepository");
const connectedClients = new Set();
const sensorRepository = new MysqlSensorRepository_1.MysqlSensorRepository();
function handleWebSockets(io) {
    io.on("connection", (socket) => __awaiter(this, void 0, void 0, function* () {
        console.log("Un usuario conectado!");
        connectedClients.add(socket);
        yield emitLast12DataToClient(socket);
        socket.on("disconnect", () => {
            console.log("Un usuario se desconectó!");
            connectedClients.delete(socket);
        });
    }));
    setInterval(() => __awaiter(this, void 0, void 0, function* () {
        yield emitLast12DataToClients();
    }), 5000);
}
exports.handleWebSockets = handleWebSockets;
function emitLast12DataToClients() {
    return __awaiter(this, void 0, void 0, function* () {
        const last12SensorData = yield sensorRepository.getAll();
        if (last12SensorData) {
            const jsonData = JSON.stringify(last12SensorData);
            for (const clientSocket of connectedClients) {
                clientSocket.emit("sen_data", jsonData);
            }
        }
    });
}
function emitLast12DataToClient(socket) {
    return __awaiter(this, void 0, void 0, function* () {
        const last12SensorData = yield sensorRepository.getAll();
        if (last12SensorData) {
            const jsonData = JSON.stringify(last12SensorData);
            socket.emit("sen_data", jsonData);
        }
    });
}

