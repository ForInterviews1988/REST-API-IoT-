
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn,ManyToOne,OneToMany, ManyToMany, JoinTable } from "typeorm";
import User from "./User";
import  { Location }  from "./Location";
import Email  from "./Email";
import AppEntity from "./AppEntity";
import  { JourneyContext } from "./JourneyContext";

@Entity()
export class Journey   {

    @PrimaryGeneratedColumn()
    journeyid: number;

    @ManyToOne(type => User, user => user.createdJourneys)
    created_by: User;

    @ManyToOne(type => User, user => user.startedJourneys)
    started_by: User;
    @ManyToOne(type => User, user => user.endedJourneys)
    ended_by: User;

    @OneToMany(type => AppEntity, entity => entity.journey)
    entity: AppEntity[];
   
    @OneToMany(type => Email, email => email.journey)
    email: Email[];


    @Column("datetime",{nullable: true})
    created_at ;
    @Column("datetime",{nullable: true})
    started_at 
    @Column("datetime",{nullable: true})
    ended_at ;

    @Column("simple-json",{nullable: true})
    composition ;

    
    
    @OneToMany(type => JourneyContext, journeycontext => journeycontext.journey)
    journeycontext: JourneyContext[];

    @ManyToOne(type => Location, destination => destination.deslocation)
    destination: Location;
    @ManyToOne(type => Location, departure => departure.deplocation)
    departure: Location;

    @ManyToMany(type => User, (users) => users.journeys)
    @JoinTable()
    users:User[];

}
export default Journey;