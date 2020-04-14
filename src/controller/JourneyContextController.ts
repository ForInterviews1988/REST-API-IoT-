import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import JourneyContext from "../entity/JourneyContext";


export class JourneyContextController {

    private journeycontextRepository = getRepository(JourneyContext);


    async all(request: Request, response: Response, next: NextFunction) {
        return this.journeycontextRepository.find();
    }
 

    async one(request: Request, response: Response, next: NextFunction) {
        return this.journeycontextRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.journeycontextRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let journeycontextToRemove = await this.journeycontextRepository.findOne(request.params.id);
        await this.journeycontextRepository.remove(journeycontextToRemove);
    }

}