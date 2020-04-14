
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn ,OneToMany, ManyToMany, JoinTable} from "typeorm";
import User from "./User";


 
@Entity()
export class Privilege {

    @PrimaryGeneratedColumn()
    privilegeid: number;    
    @Column()
    description: string;

    

    @ManyToMany(type => User, (usersprivileges) => usersprivileges.privileges)
    @JoinTable()
    usersprivileges:User[];
    


}
export default Privilege;
