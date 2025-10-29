import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
} from "typeorm";
import { Deck } from "../deck/deck.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ nullable: true })
  password: string; // nullable for Auth0 users

  @Index('idx_users_auth0_id')
  @Column({ nullable: true, unique: true })
  auth0Id: string; // Auth0 user ID

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  location: string;

  @Column("text", { nullable: true })
  bio: string;

  @Column({ default: "Free Plan" })
  plan: string;

  @Column({ type: "bigint", default: 0 })
  dataProcessed: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: "local" })
  provider: string; // 'local' or 'auth0'

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Deck, (deck) => deck.user, { cascade: true })
  decks: Deck[];
}
