

import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn,ManyToMany,JoinTable } from "typeorm";
import AppEntity from "./AppEntity";
import {Palette} from "./Palette";

@Entity()
export class Container extends AppEntity {

    
    @OneToOne(type => AppEntity)
    @JoinColumn()
    appentity: AppEntity;
    @ManyToMany(type => Palette, (palettes) => palettes.containers)
    @JoinTable()
    palettes:Palette[];
    
}