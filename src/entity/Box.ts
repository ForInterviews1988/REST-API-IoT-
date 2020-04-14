import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, OneToMany, JoinTable, ManyToMany } from "typeorm";
import AppEntity from "./AppEntity";
import { Palette } from "./Palette";
import { Product } from "./Product";

@Entity()
export class Box extends AppEntity {


    @OneToOne(type => AppEntity)
    @JoinColumn()
    appentity: AppEntity;
    
    @ManyToMany(type => Palette, (palettes) => palettes.boxes)
    @JoinTable()
    palettes:Palette[];


    @ManyToMany(type => Product, products=> products.boxes)
    @JoinTable(
     /*    {

        name: "box_products_product", // table name for the junction table of this relation
        joinColumn: {
            name: "box",
            referencedColumnName: "boxid"
        },
        inverseJoinColumn: {
            name: "product",
            referencedColumnName: "productid"
        }
    } */
    )
    products:Product[];

    
}