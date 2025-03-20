import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "lead" })
export class Lead {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  country: string;

  @Column({ nullable: true })
  linkedIn?: string;

  @Column()
  resume: string;

  @Column("simple-array")
  visaCategory: string[];

  @Column({ type: "text" })
  details: string;

  @Column({
    type: "enum",
    enum: ["PENDING", "REACHED_OUT"],
    default: "PENDING",
  })
  status?: "PENDING" | "REACHED_OUT";

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
