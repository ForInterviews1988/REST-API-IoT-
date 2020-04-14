import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Location} from "../entity/Location";
var osm = require('osm');


export class LocationController {

    private locationRepository = getRepository(Location);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.locationRepository.find();
    }
/* 
    async getCurrentLocationOSM(request: Request, response: Response, next: NextFunction) {
        // show a map of the current position with a custom radius
         var map = osm();
         map = osm().radius(0.008);
        document.body.appendChild(map.show());
        return map;
    } */

    async one(request: Request, response: Response, next: NextFunction) {
        return this.locationRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.locationRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let locationToRemove = await this.locationRepository.findOne(request.params.id);
        await this.locationRepository.remove(locationToRemove);
    }

}