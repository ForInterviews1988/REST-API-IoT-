import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";
require('dotenv').config();
const bcrypt = require('bcrypt');
import { checkRole } from "../middlewares/checkRole";
import { authenticateToken } from "../middlewares/checkRole";

//import { checkJwt } from "../middlewares/checkJwt";
var sessionstorage = require('sessionstorage');
const Cookie = require('cookie-httponly');


const jwt = require('jsonwebtoken');
let refreshTokens = [];

export class UserController {


    private userRepository = getRepository(User);

    /* @Get('/')
    @UseBefore(checkRole["ADMIN"]) */
    async all(request: Request, response: Response, next: NextFunction){
        
        await authenticateToken(request, response, next);
        await checkRole( request, response, next,["ADMIN"] );
        
        if( response.locals.checkroleresult === false) {response.sendStatus(403);}
        else{
        var users = await this.userRepository.createQueryBuilder("User").getMany();
        response.send(users);}


    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.findOne(request.params.id);
    }


     generateAccessToken(user){
        return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET ,{expiresIn : '30s'} );
    }

    async login(request: Request, response: Response, next: NextFunction) {
        const typeormuser = await this.userRepository.findOne({username : request.body.username});
        const user = {userid : typeormuser.userid, username : typeormuser.username, password : typeormuser.password};
         if (user == undefined){
            response.status(404).send("User Not registred ! please sign up to our website !");
        }
        else{
            try{
                if (await bcrypt.compare(request.body.password, user.password )){
                    const accessToken = this.generateAccessToken(user);
                    const refreshToken = jwt.sign(user,process.env.REFRESH_TOKEN_SECRET);
                    refreshTokens.push(refreshToken);
                    //let headers = new headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + accessToken });


 
                    //sessionstorage.removeItem("jwtToken") at /logout
                    sessionstorage.setItem("jwtToken", accessToken);

                    //alternatively we could work with cookies 
                    //const cookie = new Cookie(request, response);
                    //cookie.set('sessiontoken', accessToken);


                     // check the sent data structure afterwards !!!
                    response.header('authorization', "Bearer " + accessToken).status(200).send({user : user.username ,accessToken : accessToken, refreshToken:refreshToken});
                }
                else{
                    response.status(403).send("Incorrect Password ! Please Try Again !");
                }

            }
            catch{response.sendStatus(500);}
        }
        
        
    }

    async token(request: Request, response: Response, next: NextFunction) {
        const refreshToken = request.body.token;
        if (refreshToken ==null) return response.sendStatus(401);
        if (!refreshTokens.includes(refreshToken)) return response.sendStatus(403);
         jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
            if (err) response.sendStatus(403);
            const accessToken = this.generateAccessToken({name:user.username});
            response.json({accessToken:accessToken});     
        });
    }


    async save(request: Request, response: Response, next: NextFunction) {

        const salt =  await bcrypt.genSalt();
        const hashedpassword = await bcrypt.hash(request.body.password,salt);
        return this.userRepository.save({username : request.body.username, password : hashedpassword,role:request.body.role});
    }


    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.userRepository.findOne(request.params.id);
        await this.userRepository.remove(userToRemove);
    }

}