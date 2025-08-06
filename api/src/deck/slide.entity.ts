import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Deck } from "./deck.entity";

@Entity("slides")
export class Slide {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  headline: string;

  @Column({ nullable: true })
  hook: string;

  @Column("jsonb", { nullable: true })
  key_points: string[];

  @Column("text", { nullable: true })
  speaker_notes: string;

  @Column("text")
  content: string;

  @Column({ default: 0 })
  order: number;

  @Column({ default: "basic" })
  type: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column("uuid")
  deckId: string;

  @ManyToOne(() => Deck, (deck) => deck.slides, { onDelete: "CASCADE" })
  @JoinColumn({ name: "deckId" })
  deck: Deck;
}
