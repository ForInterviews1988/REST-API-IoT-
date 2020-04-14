
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn ,OneToMany,ManyToOne} from "typeorm";
//import AppEntity from "./AppEntity";
import Beecon from "./Beecon";
import Reading from "./Measure";
import Journey from "./Journey";
import User from "./User";

 
@Entity()
export class Email {

    @PrimaryGeneratedColumn()
    emailid: number;    
    @Column("datetime")
    sent_at;
    @Column()
    body: string;
    @Column()
    object: string;

    @ManyToOne(type => Journey, journey => journey.email)
    journey: Journey;

    @ManyToOne(type => User, user => user.email)
    user: User;
    
    


}
export default Email;
