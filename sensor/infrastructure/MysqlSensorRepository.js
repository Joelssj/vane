"use strict";
// MysqlSensorRepository.ts
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
exports.MysqlSensorRepository = void 0;
const mysql_1 = require("../../database/mysql");
const Sensor_1 = require("../domain/Sensor");
class MysqlSensorRepository {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT * FROM sensor ORDER BY fecha DESC, hora DESC LIMIT 12"; // Modificación aquí
            try {
                const [data] = yield (0, mysql_1.query)(sql, []);
                const dataSensores = Object.values(JSON.parse(JSON.stringify(data)));
                return dataSensores.map((sensor) => new Sensor_1.Sensor(sensor.id, sensor.temperatura, sensor.humedad, sensor.luz, sensor.comida, sensor.fecha, sensor.hora));
            }
            catch (error) {
                console.error("Error al obtener datos del sensor desde MySQL:", error);
                return null;
            }
        });
    }
    getById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT * FROM sensor WHERE id=?";
            const params = [userId];
            try {
                const [result] = yield (0, mysql_1.query)(sql, params);
                // No es necesaria la validación de la cantidad de filas afectadas, ya que, al
                // estar dentro de un bloque try/catch, si hay error se captura en el catch
                return new Sensor_1.Sensor(result[0].id, result[0].temperatura, result[0].humedad, result[0].luz, result[0].comida, result[0].fecha, result[0].hora);
            }
            catch (error) {
                return null;
            }
        });
    }
    createSensor(temperatura, humedad, luz, comida, fecha, hora) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "INSERT INTO sensor (temperatura, humedad, luz, comida, fecha, hora) VALUES (?, ?, ?, ?, ?, ?)";
            const params = [temperatura, humedad, luz, comida, fecha, hora];
            try {
                const [result] = yield (0, mysql_1.query)(sql, params);
                // No es necesaria la validación de la cantidad de filas afectadas, ya que, al
                // estar dentro de un bloque try/catch, si hay error se captura en el catch
                return new Sensor_1.Sensor(result.insertId, temperatura, humedad, luz, comida, fecha, hora);
            }
            catch (error) {
                return null;
            }
        });
    }
}
exports.MysqlSensorRepository = MysqlSensorRepository;
