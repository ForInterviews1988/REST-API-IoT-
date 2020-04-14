
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne,ManyToMany,JoinTable } from "typeorm";
import AppEntity from "./AppEntity";
import {Box} from "./Box";

@Entity()
export class Product extends AppEntity {

 
    

    @OneToOne(type => AppEntity)
    @JoinColumn()
    appentity: AppEntity;
    
    @ManyToMany(type => Box, boxes => boxes.products )
    @JoinTable(
      /*   {

        name: "product_boxes_box", // table name for the junction table of this relation
        joinColumn: {
            name: "product",
            referencedColumnName: "productid"
        },
        inverseJoinColumn: {
            name: "box",
            referencedColumnName: "boxid"
        }
    } */
     
    )
    boxes:Box[];
    
}