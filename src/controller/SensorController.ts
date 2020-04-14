import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Sensor} from "../entity/Sensor";
import {Beecon} from "../entity/Beecon";

export class SensorController {

    private sensorRepository = getRepository(Sensor);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.sensorRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.sensorRepository.findOne(request.params.id);
    }
    async getSensorsofBeecon(request: Request, response: Response, next: NextFunction) { 
        var  appentityRepository = getRepository(Beecon);
        var sensors = await appentityRepository.createQueryBuilder("Beecon").leftJoinAndSelect("Beecon.sensors", "beeconsensorRelation") .where("Beecon.beeconid = :id", { id : request.params.id }).getOne();
        return sensors;
      }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.sensorRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let sensorToRemove = await this.sensorRepository.findOne(request.params.id);
        await this.sensorRepository.remove(sensorToRemove);
    }

}