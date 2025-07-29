import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Slide } from './slide.entity';

@Entity()
export class Deck {
  @PrimaryGeneratedColumn() // Auto-incrementing ID
  id: number;

  @Column()
  title: string;

  @OneToMany(() => Slide, slide => slide.deck, { cascade: true }) // One deck can have many slides
  slides: Slide[];
}