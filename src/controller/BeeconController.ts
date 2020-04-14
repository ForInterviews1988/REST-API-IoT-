import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Beecon} from "../entity/Beecon";

export class BeeconController {

    private beeconRepository = getRepository(Beecon);

    async all(request: Request, response: Response, next: NextFunction) {
        try{
          
            
            //Pagination
            
            var page = parseInt(request.query.page);
            var limit = parseInt(request.query.limit);
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const results = {};
            
            
        
            var resbeecons= await this.beeconRepository.find();

            if (endIndex<resbeecons.length){
                results["next"] = {
                    page  : page + 1,
                    limit : limit
                };
            }
                if (startIndex>0){
                results["previous"] = {
                    page  : page - 1,
                    limit : limit
                };
            }
            //Slicing all results with startIndex and endIndex
           
            results["resultBeecons"] =  resbeecons.slice(startIndex,endIndex);
            
            //return response.json(results);
            return results;
        }
        catch(e){e.message();}

    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.beeconRepository.findOne(request.params.id);
    }


    async save(request: Request, response: Response, next: NextFunction) {
        if( this.beeconRepository.save(request.body)){
            response.sendStatus(200);
        }
        else{
            response.sendStatus(500);
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        if ( await this.beeconRepository.findOne(request.params.id) == undefined){
            response.sendStatus(404);
        }
         else if( await this.beeconRepository.update(request.params.id, { datamatrix:request.body.datamatrix, mac : request.body.mac })){
            response.sendStatus(200);
        }
        
        else{
            response.sendStatus(500);
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let beeconToRemove = await this.beeconRepository.findOne(request.params.id);
        await this.beeconRepository.remove(beeconToRemove);
        response.sendStatus(200);
    }

}