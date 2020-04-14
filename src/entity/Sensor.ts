
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany,ManyToMany, JoinTable} from "typeorm";
import JourneyContext from "./JourneyContext";
import Beecon from "./Beecon";

@Entity()
export class Sensor {

    @PrimaryGeneratedColumn()
    sensorid: number;
    
    @Column()
    description: string;

    @OneToMany(type => JourneyContext, journeycontext => journeycontext.sensor)
    journeycontext: JourneyContext[];


    @ManyToMany(type => Beecon, (beecons) => beecons.sensors)
    @JoinTable()
    beecons:Beecon[];
    
}
export default Sensor;