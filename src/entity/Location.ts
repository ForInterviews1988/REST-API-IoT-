
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn,OneToMany , ManyToOne} from "typeorm";
import Journey from "./Journey";
import User from "./User";

@Entity()
export class Location   {

    @PrimaryGeneratedColumn()
    locationid: number;
    @Column()
    name: string;
    @Column()
    latitude: string;
    @Column()
    longitude: string;

    @OneToMany(type => Journey, deslocation => deslocation.destination)
    deslocation: Journey[];

    @OneToMany(type => Journey, deplocation => deplocation.departure)
    deplocation: Journey[];
    

    @OneToMany(type => User, user => user.location)
    users: User[];
    
}
export default Location;