import {getRepository, Repository, getManager,getConnection} from "typeorm";
import {NextFunction, Request, Response} from "express";
 import {Container} from "../entity/Container";
import { Palette } from "../entity/Palette";
import { Box } from "../entity/Box";
 import {Product} from "../entity/Product";


export class EntityController {
    //Entity Type (strCap) Could be Container, Palette or Box depending on route param 'name'
    async all(request: Request, response: Response, next: NextFunction) {
        try{
            var str = request.params.name;
            var strCap=str.charAt(0).toUpperCase() + str.slice(1);
            
            //Pagination
            
            var page = parseInt(request.query.page);
            var limit = parseInt(request.query.limit);
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const results = {};
            
            
        
            var  appentityRepository = getRepository(strCap);
            var resentities= await appentityRepository.find();

            if (endIndex<resentities.length){
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
           
            results["resultEntities"] =  resentities.slice(startIndex,endIndex);
            
            return results;
        }
        catch(e){e.message();}
        
        
        
    }

    async one(request: Request, response: Response, next: NextFunction) {
        var str = request.params.name;
        var strCap=str.charAt(0).toUpperCase() + str.slice(1);
        var  appentityRepository = getRepository(strCap);
        return appentityRepository.findOne(request.params.id);
    }

        // Input id of a entity Container Outputs the associated palettes
    async getPalettesofContainer(request: Request, response: Response, next: NextFunction) {
        var  appentityRepository = getRepository(Container);
        var palettes = await appentityRepository.createQueryBuilder("Container").leftJoinAndSelect("Container.palettes", "containerpaletteRelation") .where("container.entityid = :id", { id : request.params.id }).getOne();      
        return palettes;
    }

      // Input id of a entity Palette Outputs the associated boxes
    async getBoxesofPalette(request: Request, response: Response, next: NextFunction) {
        var  appentityRepository = getRepository(Palette);
        var boxes = await appentityRepository.createQueryBuilder("Palette").leftJoinAndSelect("Palette.boxes", "paletteboxRelation") .where("Palette.entityid = :id", { id : request.params.id }).getOne();      
        return boxes;
      }


      // Input id of a entity Box Outputs the associated products
    async getProductsofBox(request: Request, response: Response, next: NextFunction) { 
        var  appentityRepository = getRepository(Box);
        var boxes = await appentityRepository.createQueryBuilder("Box").leftJoinAndSelect("Box.products", "boxproductRelation") .where("Box.entityid = :id", { id : request.params.id }).getOne();
        return boxes;
      }


    async updateEntity(request: Request, response: Response, next: NextFunction) { 
        var str = request.params.name;   
        var strCap=str.charAt(0).toUpperCase() + str.slice(1);
        var  appentityRepository = getRepository(strCap);
        var entityToUpdate = await appentityRepository.createQueryBuilder("AppEntity").leftJoinAndSelect("AppEntity.journey", "entityJourneyRelation").where("AppEntity.entityid = :id", { id : request.params.id }).getOne();              
        //console.log(new Date("2011-12-18 13:00:00"));
        
        //console.log(entityToUpdate["journey"]["created_at"]);
        if (entityToUpdate ==null){
        response.sendStatus(404);
        }
        if ( entityToUpdate["journey"] != null &&  entityToUpdate["journey"]["created_at"] >= new Date("2011-12-18 13:00:00")){
            await appentityRepository.createQueryBuilder()
            .update(strCap)
            .set({ barcode : request.body.barcode, batchsize : request.body.batchsize})
            .where("entityid = :id", { id: request.params.id })
            .execute();    
            response.sendStatus(200);

        }
        else if (entityToUpdate["journey"] == null){
            await appentityRepository.createQueryBuilder()
            .update(strCap)
            .set({ barcode : request.body.barcode,batchsize : request.body.batchsize})
            .where("entityid = :id", { id: request.params.id })
            .execute();  
            response.sendStatus(200);

        }
        else{
        response.sendStatus(500);}
     
    }


    async saveProductByBox(request: Request, response: Response, next: NextFunction) {
        var  appentityRepositorypoduct = getRepository(Product);

        await appentityRepositorypoduct
        .createQueryBuilder()
        .insert()
        .into(Product)
        .values([
            { entityid: request.body.entityid, barcode: request.body.barcode ,batchsize :request.body.batchsize }, 
        ])
        .execute();
        var product  = new Product;
        var  appentityRepository = getRepository(Box);
        var BoxToUpdate = await appentityRepository.createQueryBuilder("box").leftJoinAndSelect("box.products", "gatewaybeeconsRelation") .where("box.entityid = :id", { id : request.params.id }).getOne();

        product.entityid = request.body.entityid; //test with product id is already an entry in the product table
        product.barcode = request.body.barcode;
        product.batchsize = request.body.batchsize;
        
        //console.log(BoxToUpdate["products"]);
        BoxToUpdate.products.push(product);

        


        return await appentityRepository.save(BoxToUpdate);  
}


    async saveBoxByPalette(request: Request, response: Response, next: NextFunction) {
            

        var  appentityRepositorybox = getRepository(Box);

        await appentityRepositorybox
        .createQueryBuilder()
        .insert()
        .into(Box)
        .values([
            { entityid: request.body.entityid, barcode: request.body.barcode ,batchsize :request.body.batchsize }, 
        ])
        .execute();

        var box  = new Box;
        var  appentityRepository = getRepository(Palette);
        var PaletteToUpdate = await appentityRepository.createQueryBuilder("palette").leftJoinAndSelect("palette.boxes", "paletteboxRelation") .where("palette.entityid = :id", { id : request.params.id }).getOne();

        box.entityid = request.body.entityid;
        box.barcode = request.body.barcode;
        box.batchsize = request.body.batchsize;
        PaletteToUpdate.boxes.push(box);

        return await appentityRepository.save(PaletteToUpdate);  
    }


    async savePaletteByContainer(request: Request, response: Response, next: NextFunction) {
            
        var  appentityRepository = getRepository(Container);
        var  appentityRepositorypalette = getRepository(Palette);
        //var ContainerToUpdate = await appentityRepository.createQueryBuilder("container").leftJoinAndSelect("container.palettes", "containerpaletteRelation") .where("container.entityid = :id", { id : request.params.id }).getOne();

        await appentityRepositorypalette
        .createQueryBuilder()
        .insert()
        .into(Palette)
        .values([
            { entityid: request.body.entityid, barcode: request.body.barcode ,batchsize :request.body.batchsize }, 
        ])
        .execute();

    var ContainerToUpdate  = await appentityRepository.createQueryBuilder("container") .leftJoinAndSelect("container.palettes","containerPaletteRel").where("container.entityid = :id", { id : request.params.id }).getOne();
    //var palette  = await appentityRepository.createQueryBuilder("palette") .where("palette.entityid = :id", { id : request.body.id }).getOne();
        var paletteinstance = new Palette;
        paletteinstance.entityid = request.body.entityid;
        paletteinstance.barcode = request.body.barcode;
        paletteinstance.batchsize = request.body.batchsize;
        //console.log(container);
        //ContainerToUpdate.palettes.push(paletteinstance); 
        ContainerToUpdate.palettes.push(paletteinstance);
         /* appentityRepository.createQueryBuilder()
        .relation(Container, "palettes")
        .of(request.params.id)
        .add(request.body.id); */  
        return await appentityRepository.save(ContainerToUpdate);
  
    }


    async save(request: Request, response: Response, next: NextFunction) {
        var str = request.params.name;
        var strCap=str.charAt(0).toUpperCase() + str.slice(1);
        var  appentityRepository = getRepository(strCap);
        if(appentityRepository.save(request.body)){
            response.sendStatus(200);
        } 
        else{
            response.sendStatus(500);
        }
    }


    async removeProductByBox(request: Request, response: Response, next: NextFunction, EntityType : string) {
        var appentityRepository = getRepository(Box);
        var appentityRepositoryproduct = getRepository(Product);
        const box = await appentityRepository.findOne({ entityid: request.params.idbox  });
        var product = await appentityRepository.createQueryBuilder("Box").leftJoinAndSelect("Box.products", "boxproductsRelation").getOne();      

        appentityRepository.createQueryBuilder()
        .relation(Box, "products")
        .of(box) // you can use just post id as well
        .remove(product); 

        appentityRepositoryproduct.createQueryBuilder()
        .delete()
        .from(Product)
        .where("entityid = :id", { id: request.params.idproduct})
        .execute();
        //ContainerToUpdate["products"].pop();   
        //return await appentityRepository.save(BoxToUpdate);
        return true;  
    }


    async removeBoxByPalette(request: Request, response: Response, next: NextFunction, EntityType : string) {
        var appentityRepository = getRepository(Palette);
        var appentityRepositorybox =  getRepository(Box);
        const palette = await appentityRepository.findOne({ entityid: request.params.idpalette  });
        var box = await appentityRepository.createQueryBuilder("Palette").leftJoinAndSelect("Palette.boxes", "paletteboxesRelation").getOne();      

        // Remove the Relation palette_boxes
        appentityRepository.createQueryBuilder()
        .relation(Palette, "boxes")
        .of(palette) // you can use just post id as well
        .remove(box);  

        //remove the box from the Table Box
        appentityRepositorybox.createQueryBuilder()
        .delete()
        .from(Box)
        .where("entityid = :id", { id: request.params.idbox })
        .execute();
        
        return true;  
    }


    async removePaletteByContainer(request: Request, response: Response, next: NextFunction, EntityType : string) {
        var appentityRepository = getRepository(Container);
        var appentityRepositorypalette = getRepository(Palette);
        const container = await appentityRepository.findOne({ entityid: request.params.idcontainer });
        var palette = await appentityRepository.createQueryBuilder("Container").leftJoinAndSelect("Container.palettes", "containerpaletteRel").getOne();      

        appentityRepository.createQueryBuilder()
        .relation(Container, "palettes")
        .of(container) // you can use just post id as well
        .remove(palette); 

        appentityRepositorypalette.createQueryBuilder()
        .delete()
        .from(Palette)
        .where("entityid = :id", { id: request.params.idpalette})
        .execute();
        return true;  
    }


    async remove(request: Request, response: Response, next: NextFunction, EntityType : string) {
        var str = request.params.name;
        var strCap=str.charAt(0).toUpperCase() + str.slice(1);
        var  appentityRepository = getRepository(strCap);
        let containerToRemove = await appentityRepository.findOne(request.params.id);
        return await appentityRepository.remove(containerToRemove);
    }

    
}