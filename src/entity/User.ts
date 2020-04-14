
import { Entity, PrimaryGeneratedColumn,ManyToMany, Column, OneToOne, JoinColumn,OneToMany, ManyToOne, JoinTable } from "typeorm";
import Journey from "./Journey";
import Email from "./Email";
import Location from "./Location";
import Privilege from "./Privilege";
import { Length, IsNotEmpty } from "class-validator";

@Entity()
export class User  {

    @PrimaryGeneratedColumn()
    userid: number;

    @Column({default:"Selim", unique : true})
    @Length(3, 100)
    username: string;
    
    @Column({default:"abc"})
    @Length(3, 100)
    password: string;

    @Column({default:"USER"})
    @IsNotEmpty()
    role: string;

    @ManyToOne(type => Location, location => location.users)
    location: Location;

    @OneToMany(type => Journey, journey => journey.created_by)
    createdJourneys: Journey[];
    @OneToMany(type => Journey, journey => journey.started_by)
    startedJourneys : Journey[];
    @OneToMany(type => Journey, journey => journey.ended_by)
    endedJourneys : Journey[];


    @ManyToMany(type => Journey, (journeys) => journeys.users)
    @JoinTable()
    journeys:Journey[];


    @ManyToMany(type => Privilege, (privileges) => privileges.usersprivileges)
    @JoinTable()
    privileges:Privilege[];
    
    

    @OneToMany(type => Email, email => email.user)
    email: Email[];


    
}

export default User;