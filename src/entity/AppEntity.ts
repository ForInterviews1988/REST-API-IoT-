import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import Journey from "./Journey";
import JourneyContext from "./JourneyContext";

@Entity()
export class AppEntity {

    @PrimaryGeneratedColumn()
    entityid: number;


    @Column({nullable: true,unique: true })
    barcode: string;
    @Column("int",{nullable: true})
    batchsize

    @OneToMany(type => JourneyContext, journeycontext => journeycontext.entity)
    journeycontext: JourneyContext[];
    @ManyToOne(type => Journey, journey => journey.entity)
    journey: Journey;
}

export default AppEntity;