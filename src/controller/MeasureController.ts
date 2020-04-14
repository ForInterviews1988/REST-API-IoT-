import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Measure} from "../entity/Measure";

export class MeasureController {

    private measureRepository = getRepository(Measure);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.measureRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.measureRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.measureRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let readingToRemove = await this.measureRepository.findOne(request.params.id);
        await this.measureRepository.remove(readingToRemove);
    }

}