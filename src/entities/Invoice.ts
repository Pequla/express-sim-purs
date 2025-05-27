import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Item } from "./Item";

@Index("fk_invoice_user_idx", ["userId"], {})
@Entity("invoice", { schema: "sim_purs_psep" })
export class Invoice {
  @PrimaryGeneratedColumn({ type: "int", name: "invoice_id", unsigned: true })
  invoiceId: number;

  @Column("int", { name: "user_id", unsigned: true })
  userId: number;

  @Column("text", { name: "customer" })
  customer: string;

  @Column("text", { name: "address" })
  address: string;

  @Column("text", { name: "tax_id", nullable: true })
  taxId: string | null;

  @Column("text", { name: "token" })
  token: string;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.invoices, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: User;

  @OneToMany(() => Item, (item) => item.invoice)
  items: Item[];
}
