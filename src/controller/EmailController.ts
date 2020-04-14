import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Email} from "../entity/Email";

export class EmailController {

    private emailRepository = getRepository(Email);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.emailRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.emailRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.emailRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let emailToRemove = await this.emailRepository.findOne(request.params.id);
        await this.emailRepository.remove(emailToRemove);
    }

}