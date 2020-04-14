import {UserController} from "./controller/UserController";
import {LocationController} from "./controller/LocationController";
import {BeeconController} from "./controller/BeeconController";
import {EntityController} from "./controller/EntityController";
//import {ProductController} from "./controller/ProductController";
import {JourneyController} from "./controller/JourneyController";
import {GatewayController} from "./controller/GatewayController";
import {EmailController} from "./controller/EmailController";
import {SensorController} from "./controller/SensorController";
import {PrivilegeController} from "./controller/PrivilegeController";
import {MeasureController} from "./controller/MeasureController";
import {JourneyContextController} from "./controller/JourneyContextController";




 
export const Routes = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
 } ,{
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
}, {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save"
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
},
{
    method: "post",
    route: "/login",
    controller: UserController,
    action: "login"
},
{
    method: "post",
    route: "/token",
    controller: UserController,
    action: "token"
},
{
    method: "get",
    route: "/containertopalettes/:id",
    controller: EntityController,
    action: "getPalettesofContainer"
},{
    method: "get",
    route: "/palettetoboxes/:id",
    controller: EntityController,
    action: "getBoxesofPalette"
},{
    method: "get",
    route: "/boxtoproducts/:id",
    controller: EntityController,
    action: "getProductsofBox"
},
{
    method: "get",
    route: "/beecontosensors/:id",
    controller: SensorController,
    action: "getSensorsofBeecon"
},
{
    method: "get",
    route: "/entities/:name",
    controller: EntityController,
    action: "all"
}, {
    method: "get",
    route: "/entities/:name/:id",
    controller: EntityController,
    action: "one"
}, {
    method: "post",
    route: "/entities/:name",
    controller: EntityController,
    action: "save"
}, 

{
    method: "post",
    route: "/saveproducttobox/:id",
    controller: EntityController,
    action: "saveProductByBox"
},
{
    method: "post",
    route: "/saveboxtopalette/:id",
    controller: EntityController,
    action: "saveBoxByPalette"
},
{
    method: "post",
    route: "/savepalettetocontainer/:id",
    controller: EntityController,
    action: "savePaletteByContainer"
},{
    method: "delete",
    route: "/removeproductbybox/:idbox/:idproduct",
    controller: EntityController,
    action: "removeProductByBox"
},
{
    method: "delete",
    route: "/removeboxbypalette/:idpalette/:idbox",
    controller: EntityController,
    action: "removeBoxByPalette"
},{

    method: "delete",
    route: "/removepalettebycontainer/:idcontainer/:idpalette",
    controller: EntityController,
    action: "removePaletteByContainer"
},
{
    method: "delete",
    route: "/entities/:name/:id",
    controller: EntityController,
    action: "remove"
},
{
    method: "put",
    route: "/entities/:name/:id",
    controller: EntityController,
    action: "updateEntity"
},
{
    method: "get",
    route: "/locations",
    controller: LocationController,
    action: "all"
},
{
    method: "post",
    route: "/locations",
    controller: LocationController,
    action: "save"
},/* {
    method: "get",
    route: "/currentlocationosm/",
    controller: LocationController,
    action: "getCurrentLocationOSM"
} */
{
    method: "get",
    route: "/locations/:id",
    controller: LocationController,
    action: "one"
},
{
    method: "delete",
    route: "/locations/:id",
    controller: LocationController,
    action: "remove"
},
{
    method: "get",
    route: "/beecons",
    controller: BeeconController,
    action: "all"
},{
    method: "post",
    route: "/beecons",
    controller: BeeconController,
    action: "save"
},
{
    method: "get",
    route: "/beecons/:id",
    controller: BeeconController,
    action: "one"
},
{
    method: "put",
    route: "/beecons/:id",
    controller: BeeconController,
    action: "update"
},
{
    method: "delete",
    route: "/beecons/:id",
    controller: BeeconController,
    action: "remove"
},{
    method: "get",
    route: "/journeys",
    controller: JourneyController,
    action: "all"
}, {
    method: "get",
    route: "/journey/:id",
    controller: JourneyController,
    action: "one"
}, {
    method: "post",
    route: "/journeys",
    controller: JourneyController,
    action: "save"
},
{
    method: "put",
    route: "/journey/:id",
    controller: JourneyController,
    action: "update"
}, {
    method: "delete",
    route: "/journey/:id",
    controller: JourneyController,
    action: "remove"
},
{
    method: "get",
    route: "/gatewaysbylocation/:location",
    controller: GatewayController,
    action: "getGatewaysByLocation"

},
{
    method: "get",
    route: "/getallbeeconsofgateways/:id",
    controller: GatewayController,
    action: "getallbeaconsofgatewaybyid"
},
{
    method: "get",
    route: "/gateways",
    controller: GatewayController,
    action: "all"
}, {
    method: "get",
    route: "/gateways/:id",
    controller: GatewayController,
    action: "one"
}, {
    method: "post",
    route: "/gateways",
    controller: GatewayController,
    action: "save"
},
{
    method: "put",
    route: "/gateways/:id",
    controller: GatewayController,
    action: "update"
},
{
    method: "delete",
    route: "/gateways/:id",
    controller: GatewayController,
    action: "remove"
},
{
    method: "get",
    route: "/emails",
    controller: EmailController,
    action: "all"
}, {
    method: "get",
    route: "/emails/:id",
    controller: EmailController,
    action: "one"
}, {
    method: "post",
    route: "/emails",
    controller: EmailController,
    action: "save"
}, {
    method: "delete",
    route: "/emails/:id",
    controller: EmailController,
    action: "remove"
},
{
    method: "get",
    route: "/sensors",
    controller: SensorController,
    action: "all"
}, {
    method: "get",
    route: "/sensors/:id",
    controller: SensorController,
    action: "one"
}, {
    method: "post",
    route: "/sensors",
    controller: SensorController,
    action: "save"
}, {
    method: "delete",
    route: "/sensors/:id",
    controller: SensorController,
    action: "remove"
},
{
    method: "get",
    route: "/privileges",
    controller: PrivilegeController,
    action: "all"
}, {
    method: "get",
    route: "/privileges/:id",
    controller: PrivilegeController,
    action: "one"
}, {
    method: "post",
    route: "/privileges",
    controller: PrivilegeController,
    action: "save"
}, {
    method: "delete",
    route: "/privileges/:id",
    controller: PrivilegeController,
    action: "remove"
},
{
    method: "get",
    route: "/measures",
    controller: MeasureController,
    action: "all"
}, {
    method: "get",
    route: "/measures/:id",
    controller: MeasureController,
    action: "one"
}, {
    method: "post",
    route: "/measures",
    controller: MeasureController,
    action: "save"
}, {
    method: "delete",
    route: "/measures/:id",
    controller: MeasureController,
    action: "remove"
},
{
    method: "get",
    route: "/journeycontexts",
    controller: JourneyContextController,
    action: "all"
}, {
    method: "get",
    route: "/journeycontexts/:id",
    controller: JourneyContextController,
    action: "one"
}, {
    method: "post",
    route: "/journeycontexts",
    controller: JourneyContextController,
    action: "save"
}, {
    method: "delete",
    route: "/journeycontexts/:id",
    controller: JourneyContextController,
    action: "remove"
}];