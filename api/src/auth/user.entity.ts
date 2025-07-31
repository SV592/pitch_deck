import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Deck } from '../deck/deck.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  

  @Column({ default: false })
  isVerified!: boolean;

  @Column({ nullable: true })
  auth0Id!: string;

  @OneToMany(() => Deck, deck => deck.user)
  decks!: Deck[];
}
