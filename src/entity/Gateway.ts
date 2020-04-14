
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn ,OneToMany} from "typeorm";
import  JourneyContext  from "./JourneyContext";


export enum GatewayStatus {
    FREE = "free",
    DEPLOYED = "deployed",
    UNUSABLE = "unusable"
}
 
@Entity()
export class Gateway {

    @PrimaryGeneratedColumn()
    gatewayid: number;    
    @Column({unique: true})
    datamatrix: string;

    @Column({unique: true})
    mac : string

    @Column({default:0})
    maxbeecons: number;
    
    @Column({
        type: "enum",
        enum: GatewayStatus,
        default: GatewayStatus.FREE
    })
    status: GatewayStatus

    @OneToMany(type => JourneyContext, journeycontext => journeycontext.gateway)
    journeycontext: JourneyContext[];


}
export default Gateway;
