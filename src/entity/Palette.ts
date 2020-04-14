


import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne,ManyToMany, JoinTable } from "typeorm";
import AppEntity from "./AppEntity";
import {Container} from "./Container";
import {Box} from "./Box";
//import ContainerPalette from "./ContainerPalette";


@Entity()
export class Palette extends AppEntity {

   
    
    @OneToOne(type => AppEntity)
    @JoinColumn()
    appentity: AppEntity;
    
    @ManyToMany(type => Container, (containers) => containers.palettes)
    containers: Container[];


    @ManyToMany(type => Box, (boxes) => boxes.palettes)
    @JoinTable()
    boxes:Box[];

}