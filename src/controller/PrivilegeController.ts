import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Privilege} from "../entity/Privilege";

export class PrivilegeController {

    private privilegeRepository = getRepository(Privilege);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.privilegeRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.privilegeRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.privilegeRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let privilegeToRemove = await this.privilegeRepository.findOne(request.params.id);
        await this.privilegeRepository.remove(privilegeToRemove);
    }

}