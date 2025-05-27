import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Invoice } from "./Invoice";

@Entity("user", { schema: "sim_purs_psep" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "user_id", unsigned: true })
  userId: number;

  @Column("varchar", { name: "indeks", length: 255 })
  indeks: string;

  @Column("varchar", { name: "token", length: 255 })
  token: string;

  @Column("longtext", { name: "key" })
  key: string;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("datetime", { name: "deleted_at", nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => Invoice, (invoice) => invoice.user)
  invoices: Invoice[];
}
