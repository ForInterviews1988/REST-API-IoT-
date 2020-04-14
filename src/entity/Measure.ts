

import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Timestamp,ManyToOne } from "typeorm";
import JourneyContext from "./JourneyContext";

@Entity()
export class Measure   {

    @PrimaryGeneratedColumn()
    measureid: number;
    @Column("double")
    value
    @Column("datetime")
    measured_at;

    @Column("tinyint")
    alarm;

    @ManyToOne(type => JourneyContext, journeycontext => journeycontext.measures)
    journeycontext: JourneyContext;
    
    
    
}
export default Measure;