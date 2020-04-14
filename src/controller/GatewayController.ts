import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Gateway} from "../entity/Gateway";
import JourneyContext from "../entity/JourneyContext";


export class GatewayController {

    private gatewayRepository = getRepository(Gateway);

    async getallbeaconsofgatewaybyid(request: Request, response: Response, next: NextFunction) {
        
        try {
    
            var gatewaybeeconidQ = await this.gatewayRepository.createQueryBuilder("gateway").leftJoinAndSelect("gateway.journeycontext", "gatewaybeeconsRelation") .where("gateway.gatewayid = :id", { id : request.params.id }).getOne();
            //get ids of list of targeted journeys then add andwhere to the below query returning beecons
            const ids =  gatewaybeeconidQ.journeycontext.map(v=>v.journeycontextid);
            const beecons = await getRepository(JourneyContext).createQueryBuilder("JourneyContext").leftJoinAndSelect("JourneyContext.beecon", "gatewaysbeecons").leftJoinAndSelect("JourneyContext.journey", "gatwaysjourneys").leftJoinAndSelect("JourneyContext.sensor", "gatwaysensors").where("JourneyContext.journeycontextid IN (:id)", { id: ids }).getMany(); 
     
            return beecons;
        }
            catch(e) { 
                console.log(e);
            }
        } 

        async getGatewaysByLocation(request: Request, response: Response, next: NextFunction) {
        
            try {
                
                var gatewaysList = await getRepository(Gateway).createQueryBuilder("gateway").select("gateway").leftJoin("gateway.journeycontext", "gatewaycontextRelation") .leftJoin("gatewaycontextRelation.journey", "contextlocation").leftJoin("contextlocation.departure", "journeylocation").where("journeylocation.name = :location", { location : request.params.location }).getMany();
               
                return gatewaysList;
            }
                catch(e) { 
                    console.log(e);
                }
            }  
    /// Combox APIs File
    /* 
        async getAPIStatus(request: Request, response: Response, next: NextFunction) {
            var status = request.body.state;
            var date = new Date(); 
            var timestamp = date.getTime();
            try {
                if (status === 0) {
                    statusResult  = 1;
                }
                else if (status === 2){

                    var comboxInfos = await this.gatewayRepository.createQueryBuilder("gateway").leftJoinAndSelect("gateway.journeycontext", "journeyContextRelation").leftJoinAndSelect("journeyContextRelation.journey", "journeyContextJourneyRelation").leftJoinAndSelect("journeyContextJourneyRelation.started_at", "journeyContextJourneyFieldstaredAtRelation") .where("gateway.mac = :mac", { mac : request.params.mac }).getOne();      

                    if (comboxInfos["journeycontext"]["journey"]["started_at"]>= new Date("2020-06-01 22:22:22") ){
                        statusResult  = 3;
                    }
                    else {
                        statusResult = 0;
                    }
                }
        
                return [statusResult, request.body.uuid, timestamp];
            }
                catch(e) { 
                    console.log(e);
                }
            }  


            async getAPIBeecons(request: Request, response: Response, next: NextFunction) {
    
                try {
                    
                    var comboxbeecons = await this.gatewayRepository.createQueryBuilder("gateway").leftJoinAndSelect("gateway.journeycontext", "journeyContextRelation").leftJoinAndSelect("journeyContextRelation.beecon", "journeyContextBeeconRelation").leftJoinAndSelect("journeyContextBeeconRelation.sensor", "journeyContextJourneyBeeconSensorRelation").leftJoinAndSelect("journeyContextJourneyBeeconSensorRelation.description", "journeyContextJourneyBeeconSensorRelation") .where("gateway.gatewayid = :id", { id : request.params.id }).getOne();      
                    return comboxbeecons;
                }
                    catch(e) { 
                        console.log(e);
                    }
                }  


                async getAPIMeasures(request: Request, response: Response, next: NextFunction) {
    
                    try {
                        
                        var comboxbeeconsmeasure = await this.gatewayRepository.createQueryBuilder("gateway").leftJoinAndSelect("gateway.journeycontext", "journeyContextRelation").leftJoinAndSelect("journeyContextRelation.beecon", "journeyContextBeeconRelation").leftJoinAndSelect("journeyContextBeeconRelation.sensor", "journeyContextJourneyBeeconSensorRelation").leftJoinAndSelect("journeyContextJourneyBeeconSensorRelation.description", "journeyContextJourneyBeeconSensorRelation") .where("gateway.gatewayid = :id", { id : request.params.id }).getOne();      
                        return comboxbeeconsmeasure;
                    }
                        catch(e) { 
                            console.log(e);
                        }
                    } */
    

    async all(request: Request, response: Response, next: NextFunction) {
        try{
             
            
            //Pagination
            
            var page = parseInt(request.query.page);
            var limit = parseInt(request.query.limit);
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const results = {};
            
            
        
            var  appentityRepository = getRepository(Gateway);
            var resgateways= await appentityRepository.find();

            if (endIndex<resgateways.length){
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
           
            results["resultGateways"] =  resgateways.slice(startIndex,endIndex);
            
            return results;
        }
        catch(e){e.message();}    }
 
    async one(request: Request, response: Response, next: NextFunction) {
        return await this.gatewayRepository.findOne(request.params.id);
    }

    
    async save(request: Request, response: Response, next: NextFunction) {
 
        if( this.gatewayRepository.save(request.body)){
            response.sendStatus(200);
        }
        else{
            response.sendStatus(500);
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        if ( await this.gatewayRepository.findOne(request.params.id) == undefined){
            response.sendStatus(404);
        }
         else if( await this.gatewayRepository.update(request.params.id, { datamatrix:request.body.datamatrix, mac : request.body.mac , maxbeecons :request.body.maxbeecons ,status : request.body.status})){
            response.sendStatus(200);
        }
        
        else{
            response.sendStatus(500);
        }
          
        }

    async remove(request: Request, response: Response, next: NextFunction) {
        let gatewayToRemove = await this.gatewayRepository.findOne(request.params.id);
        return await this.gatewayRepository.remove(gatewayToRemove);
    }

}