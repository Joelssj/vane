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
exports.CreateSensorUseCase = void 0;
class CreateSensorUseCase {
    constructor(sensorRepository) {
        this.sensorRepository = sensorRepository;
    }
    run(temperatura, humedad, luz, comida, // Cambio de tipo a número
    fecha, hora) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sensor = yield this.sensorRepository.createSensor(temperatura, humedad, luz, comida, // Cambio de tipo a número
                fecha, hora);
                return sensor;
            }
            catch (error) {
                return null;
            }
        });
    }
}
exports.CreateSensorUseCase = CreateSensorUseCase;
/*import { Sensor } from "../domain/Sensor";
import { SensorRepository } from "../domain/SensorRepository";

export class CreateSensorUseCase {
  constructor(readonly sensorRepository: SensorRepository) {}

async run(
  temperatura: number,
  humedad: number,
  luz: number,
  comida: string,
  fecha: Date,
  hora: string
): Promise<Sensor | null> {
  try {
    const sensor = await this.sensorRepository.createSensor(
      temperatura,
      humedad,
      luz,
      comida,
      fecha,
      hora
    );
    return sensor;
  } catch (error) {
    return null;
  }
}
}*/
