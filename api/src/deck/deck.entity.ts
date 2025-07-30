import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Slide } from './slide.entity';
import { User } from '../auth/user.entity';

@Entity()
export class Deck {
  @PrimaryGeneratedColumn() // Auto-incrementing ID
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => User, user => user.decks)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number;

  @OneToMany(() => Slide, slide => slide.deck, { cascade: true }) // One deck can have many slides
  slides: Slide[];
}