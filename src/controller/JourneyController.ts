import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Journey} from "../entity/Journey";
 import {Container} from "../entity/Container";
import {Palette} from "../entity/Palette";
import {Box} from "../entity/Box";
import { clearScreenDown } from "readline";
 


export class JourneyController {

    private journeyRepository = getRepository(Journey);

    async all(request: Request, response: Response, next: NextFunction) {
        try{
           /*  var str = request.params.name;
            var strCap=str.charAt(0).toUpperCase() + str.slice(1); */
            
            //Pagination
            
            var page = parseInt(request.query.page);
            var limit = parseInt(request.query.limit);
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const results = {};
            
            
        
            var  journeyRepository = getRepository(Journey);
            var resjourneys= await journeyRepository.find();

            if (endIndex<resjourneys.length){
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
           
            results["resultJourneys"] =  resjourneys.slice(startIndex,endIndex);
            
            return results;
        }
        catch(e){e.message();}
            }

    async one(request: Request, response: Response, next: NextFunction) {
        var journey;
        try {

            if(journey =  await this.journeyRepository.createQueryBuilder("journey").leftJoinAndSelect("journey.departure", "journeyLocationRelation").leftJoinAndSelect("journey.destination", "journeyLocationDestRelation").where("journey.journeyid = :journeyid", { journeyid : request.params.id }).getOne()){
                response.status(200).send({journey});
            }
            else{
                response.status(404).send({"Status" : "404" });
            }
        }
       // return this.journeyRepository.findOne(request.params.id);
        catch(error)
        {    
            response.status(500).send({"Error " : error})
        }
    }

    async save(request: Request, response: Response, next: NextFunction) {
        try {
            var list_of_entities = request.body.composition;

            var  journeyRepository = await getRepository(Journey);
            await journeyRepository.createQueryBuilder().insert().into(Journey).values({ composition: request.body.composition  }).execute();
            /* Add Journer's Departure   */ 

            var journeydeparture = await journeyRepository.createQueryBuilder("Journey").leftJoinAndSelect("Journey.departure", "journeyLocationRelation").getOne();      
            await journeyRepository.createQueryBuilder()
            .relation(Journey, "departure")
            .of(journeydeparture) // you can use just post id as well
            .set(request.body.departure); 

            /* Add Journer's Destination   */ 

            var journeydestination = await journeyRepository.createQueryBuilder("Journey").leftJoinAndSelect("Journey.destination", "journeyLocationDestRelation").getOne();      
            await journeyRepository.createQueryBuilder()
            .relation(Journey, "departure")
            .of(journeydestination) // you can use just post id as well
            .set(request.body.destination); 
            await list_of_entities.forEach( async (item, index, array) => {
                
                /* var result=[];
                result.push(item.entityid, item.type); */

                var strCap=item.type.charAt(0).toUpperCase() + item.type.slice(1);
                var  appentityRepository = await getRepository(strCap);

                if ( ! await appentityRepository.createQueryBuilder("entity").where("entity.entityid = :entityid", { entityid : item.entityid }).getOne())     
                {
                    await appentityRepository.createQueryBuilder().insert().into(strCap).values({ entityid: item.entityid, /* barcode: request.body.barcode ,batchsize :request.body.batchsize */ }).execute();
                } 
                
                if(item.type === "container"){
                    var  containerRepository = await getRepository(Container);
                    var container  = await containerRepository.createQueryBuilder("container") .leftJoinAndSelect("container.palettes","containerPaletteRel").where("container.entityid = :id", { id :  item.entityid }).getOne();
                    var nextItem = array[index+1];
                    /* var palette = new Palette;
                    palette.entityid = nextItem.entityid;
                    container.palettes.push(palette); */
                    await appentityRepository.createQueryBuilder()
                    .relation(Container, "palettes")
                    .of(container) // you can use just post id as well
                    .add(nextItem); 
                    } 
                if (item.type ==="palette"){
                    var  paletteRepository = await getRepository(Palette);
                    var palette  = await paletteRepository.createQueryBuilder("palette") .leftJoinAndSelect("palette.boxes","paletteboxRel").where("palette.entityid = :id", { id : item.entityid }).getOne();
                    var nextItem = array[index+1];
                    /* var box = new Box;
                    box.entityid = nextItem.entityid;
                    palette.boxes.push(box); */

                    await appentityRepository.createQueryBuilder()
                    .relation(Palette, "boxes")
                    .of(palette) // you can use just post id as well
                    .add(nextItem); 

                    }
                    
                if (item.type === "box" ){
                    var  boxRepository = await getRepository(Box);
                    var box  = await boxRepository.createQueryBuilder("box") .leftJoinAndSelect("box.products","boxproduct").where("box.entityid = :id", { id : item.entityid }).getOne();
                    index++;
                    var nextItem = array[index];
                    while (index < array.length  && nextItem.type ==="product" ) {
                            
                        await appentityRepository.createQueryBuilder()
                        .relation(Box, "products")
                        .of(box) // you can use just post id as well
                        .add(nextItem); 
                        index++;
                        nextItem = array[index];
                        
                       
                }
            
            } 

            });         
            response.status(200).send({"status" : "200"});
        }
        catch(e){
            response.status(500).send("Error" + e);
        }

    }

        async update(request: Request, response: Response, next: NextFunction){
           
            var  journeyRepository = getRepository(Journey);
            var journeyToUpdate = await journeyRepository.findOne(request.params.id);
            if (journeyToUpdate ==null){
                response.status(404).send({"status" : "404"});
                }
        try{
            if (journeyToUpdate["created_at"] === null /* >= new Date("2011-12-18 13:00:00") */){

                
            var composition = journeyToUpdate['composition']; 
           
            
            await journeyRepository.createQueryBuilder()
            .update(Journey)
            .set({ created_at : request.body.created_at, started_at : request.body.started_at, ended_at : request.body.ended_at,composition : request.body.composition})
            .where("journeyid = :id", { id: request.params.id })
            .execute();
            /// Update Journey Departure & Destination 


            /* Update Add Journer's Departure   */ 

            var journeydeparture = await journeyRepository.createQueryBuilder("Journey").leftJoinAndSelect("Journey.departure", "journeyLocationRelation").getOne();      
            await journeyRepository.createQueryBuilder()
            .relation(Journey, "departure")
            .of(journeydeparture) // you can use just post id as well
            .update(request.body.departure); 

            /* Update Journer's Destination   */ 

            var journeydestination = await journeyRepository.createQueryBuilder("Journey").leftJoinAndSelect("Journey.destination", "journeyLocationDestRelation").getOne();      
            await journeyRepository.createQueryBuilder()
            .relation(Journey, "departure")
            .of(journeydestination) // you can use just post id as well
            .update(request.body.destination);

           /*  composition.forEach(async (item, index, array) => {
                var strCap=item.type.charAt(0).toUpperCase() + item.type.slice(1);
                var journeyentityRepository = getRepository(strCap);
                await journeyentityRepository.createQueryBuilder()
                .delete()
                .from(strCap)
                .where("entityid = :id", { id: item.entityid})
                .execute();
            }) */


            var list_of_entities = request.body.composition;
            await list_of_entities.forEach( async (item, index, array) => {

                var strCap=item.type.charAt(0).toUpperCase() + item.type.slice(1);
                var appentityRepository = getRepository(strCap);
                var EntityExists = await appentityRepository.createQueryBuilder("entity").where("entity.entityid = :entityid", { entityid : item.entityid }).getOne();
                
    
                if ( ! EntityExists)     
                {
                    await appentityRepository.createQueryBuilder().insert().into(strCap).values({ entityid: item.entityid, /* barcode: request.body.barcode ,batchsize :request.body.batchsize */ }).execute();
                } 
        
               /*  var strCap=item.type.charAt(0).toUpperCase() + item.type.slice(1);
                var  appentityRepository = await getRepository(strCap); */
               // await appentityRepository.createQueryBuilder().insert().into(strCap).values({ entityid: item.entityid, /* barcode: request.body.barcode ,batchsize :request.body.batchsize */ }).execute();
                        
                    if(item.type === "container"){
                        var  containerRepository = await getRepository(Container);
                        var container  = await containerRepository.createQueryBuilder("container") .leftJoinAndSelect("container.palettes","containerPaletteRel").where("container.entityid = :id", { id :  item.entityid }).getOne();
                        var nextItem = array[index+1];
                        /* var palette = new Palette;
                        palette.entityid = nextItem.entityid;
                        container.palettes.push(palette); */
                         if (container.palettes.length != 0){
                            await appentityRepository.createQueryBuilder()
                            .relation(Container, "palettes")
                            .of(container) // you can use just post id as well
                            .update(nextItem); 
                        }
                        else{
                            await appentityRepository.createQueryBuilder()
                            .relation(Container, "palettes")
                            .of(container) // you can use just post id as well
                            .add(nextItem); 
                        }
                        
                        } 
                    if (item.type ==="palette"){
                        var  paletteRepository = await getRepository(Palette);
                        var palette  = await paletteRepository.createQueryBuilder("palette") .leftJoinAndSelect("palette.boxes","paletteboxRel").where("palette.entityid = :id", { id : item.entityid }).getOne();
                        var nextItem = array[index+1];
                        /* var box = new Box;
                        box.entityid = nextItem.entityid;
                        palette.boxes.push(box); */
                        if (palette.boxes.length != 0){
                        await appentityRepository.createQueryBuilder()
                        .relation(Palette, "boxes")
                        .of(palette) // you can use just post id as well
                        .update(nextItem); 
        
                        }
                        else{
                            await appentityRepository.createQueryBuilder()
                        .relation(Palette, "boxes")
                        .of(palette) // you can use just post id as well
                        .add(nextItem); 

                        }}
                        
                    if (item.type === "box" ){
                        var  boxRepository = await getRepository(Box);
                        var box  = await boxRepository.createQueryBuilder("box") .leftJoinAndSelect("box.products","boxproduct").where("box.entityid = :id", { id : item.entityid }).getOne();
                        index++;
                        var nextItem = array[index];
                        while (index < array.length && nextItem.type ==="product" ) {
                            
                            if (box.products.length != 0){
                            await appentityRepository.createQueryBuilder()
                            .relation(Box, "products")
                            .of(box) 
                            .update(nextItem);}
                            else{
                                await appentityRepository.createQueryBuilder()
                            .relation(Box, "products")
                            .of(box) 
                            .add(nextItem);
                            }

                            index++;
        
                            var nextItem = array[index];
                    }
            
                } 
                });      

        }
        response.sendStatus(200); }//this.journeyRepository.save(journeyToUpdate);
        catch(e){
            response.status(500).send("Error : " + e);
        }
        }

    async remove(request: Request, response: Response, next: NextFunction) {
    
        var  appentityRepository = getRepository(Journey);
        var journeyToRemove = await appentityRepository.findOne(request.params.id);
        var composition = journeyToRemove['composition']; 

        if (journeyToRemove["started_at"] === null ){
            composition.forEach(async (item, index, array) => {
                var strCap=item.type.charAt(0).toUpperCase() + item.type.slice(1);
                var journeyentityRepository = getRepository(strCap);
                await journeyentityRepository.createQueryBuilder()
                .delete()
                .from(strCap)
                .where("entityid = :id", { id: item.entityid})
                .execute();
            })
            return appentityRepository.remove(journeyToRemove);
        } 
        
    }

}