import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Deck } from '../deck/deck.entity';

@Entity()
export class User {
  @PrimaryColumn()
  auth0Id!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  location?: string;

  @Column({ nullable: true })
  bio?: string;

  @Column({ default: false })
  isVerified!: boolean;

  @OneToMany(() => Deck, deck => deck.user)
  decks!: Deck[];
}