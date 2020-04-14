
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn ,OneToMany, ManyToOne} from "typeorm";
import Beecon from "./Beecon";
import AppEntity from "./AppEntity";
import Sensor from "./Sensor";
import Journey from "./Journey";
import Gateway from "./Gateway";
import Measure from "./Measure";

 
@Entity()
export class JourneyContext {

    @PrimaryGeneratedColumn()
    journeycontextid: number;  

    @Column("double")
    Min

    @Column("double")
    Max

    @Column()
    SendInterval: number;

    @Column()
    MeasureInterval: number;

    @OneToMany(type => Measure, measures => measures.journeycontext)
    measures: Measure[];

    @ManyToOne(type => Gateway, gateway => gateway.journeycontext)
    gateway: Gateway;

    @ManyToOne(type => AppEntity, entity => entity.journeycontext)
    entity: AppEntity;

    @ManyToOne(type => Beecon, beecon => beecon.journeycontext)
    beecon: Beecon;
    @ManyToOne(type => Sensor, sensor => sensor.journeycontext)
    sensor: Sensor;

    @ManyToOne(type => Journey, journey => journey.journeycontext)
    journey: Journey;


}
export default JourneyContext;
