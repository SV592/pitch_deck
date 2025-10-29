import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
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

  @Column({ type: "jsonb", nullable: true })
  theme: any;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Index('idx_decks_user_id')
  @Column("uuid")
  userId: string;

  @ManyToOne(() => User, (user) => user.decks, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: User;

  @OneToMany(() => Slide, (slide) => slide.deck, { cascade: true })
  slides: Slide[];
}
