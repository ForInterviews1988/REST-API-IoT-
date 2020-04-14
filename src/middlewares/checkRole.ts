import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
const jwt = require('jsonwebtoken');
require('dotenv').config();
var sessionstorage = require('sessionstorage');
const Cookie = require('cookie-httponly');
import { User } from "../entity/User";


// To authenticate the user through its token (to put in controller method declaration)
export const authenticateToken = (request: Request, response: Response, next: NextFunction ) => {
  
    // get the Token from /login

    //const cookie = new Cookie(request, response);
    //var token  = cookie.get('sessiontoken');

    let tokenss = sessionstorage.getItem("jwtToken");

    request.headers['authorization'] = "Bearer "+tokenss;
  
    const authHeader = request.headers['authorization'];
    console.log(authHeader);
    const token = authHeader && authHeader.split(' ')[1]; 
    if (token == null) return response.sendStatus(401);
    const jwtPayload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    response.locals.jwtPayload = jwtPayload;
    next;
 }
export const checkRole = async ( request: Request, response: Response, next: NextFunction,  roles: Array<string>) => {  

    // try putting res.locals.jwtPayload in Redis instead
    
    //Get the user ID from previous midleware
    response.locals.checkroleresult = true;
    const id =  response.locals.jwtPayload.userid;
     
      //Get user role from the database
    const userRepository =  getRepository(User);
    let user: User;
    try 
    {

        user =   await userRepository.findOneOrFail(id);
      
    } 
    catch (err) 
    {
      console.log(false);
    }
      //Check if array of authorized roles includes the user's role
    if (roles.indexOf(user.role) > -1)  { next;}
    
    else  { response.locals.checkroleresult =false; next;}
  };
