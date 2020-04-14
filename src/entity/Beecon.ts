import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn,ManyToOne,OneToMany , ManyToMany, JoinTable} from "typeorm";
import Gateway from "./Gateway";
import {Sensor} from "./Sensor";
import Reading from "./Measure";
import AppEntity from "./AppEntity";
import JourneyContext from "./JourneyContext";


export enum BeeconStatus {
    FREE = "Free",
    DEPLOYED = "Deployed",
    UNUSABLE = "Unusable"
}

@Entity()
export class Beecon  {

    
    @PrimaryGeneratedColumn()
    beeconid: number; 
    @Column({default:"0000000000",unique: true})
    datamatrix: string;
    @Column({unique: true})
    mac: string;

    @Column({
        type: "enum",
        enum: BeeconStatus,
        default: BeeconStatus.FREE
    })
    status: BeeconStatus

     
    @OneToMany(type => JourneyContext, journeycontext => journeycontext.beecon)
    journeycontext: JourneyContext[];

    
    @ManyToMany(type => Sensor, (sensors) => sensors.beecons)
    @JoinTable()
    sensors:Sensor[];

}
export default Beecon;