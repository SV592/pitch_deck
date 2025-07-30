import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Deck } from './deck.entity';

@Entity()
export class Slide {
  @PrimaryGeneratedColumn() // Auto-incrementing ID
  id!: number;

  @Column()
  title!: string;

  @Column('text') // Use 'text' for potentially long content
  content!: string;

  @Column()
  order!: number;

  @ManyToOne(() => Deck, deck => deck.slides) // Many slides can belong to one deck
  deck!: Deck;
}