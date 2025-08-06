import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { User } from "../auth/user.entity";
import { Slide } from "../deck/slide.entity";

@Entity("decks")
export class Deck {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column("uuid")
  userId: string;

  @ManyToOne(() => User, (user) => user.decks, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: User;

  @OneToMany(() => Slide, (slide) => slide.deck, { cascade: true })
  slides: Slide[];

  @Column({ type: 'jsonb', nullable: true })
  theme: any;
}
