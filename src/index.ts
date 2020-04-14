import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import {Routes} from "./routes";
 


createConnection().then(async connection => {

    // create express app
     const app = express();

   

    app.use(bodyParser.json());

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });

    
    // setup express app here
    // ...

    // start express server
    //app.listen(3000);
    app.listen(3000 , /* "192.168.1.105" */);

    // insert new users for test
    
    console.log("The server is launched. (port 3000)");
 
}).catch(error => console.log(error));


