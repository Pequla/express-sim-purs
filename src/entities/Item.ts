import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Invoice } from "./Invoice";

@Index("fk_item_invoice_idx", ["invoiceId"], {})
@Entity("item", { schema: "sim_purs_psep" })
export class Item {
  @PrimaryGeneratedColumn({ type: "int", name: "item_id", unsigned: true })
  itemId: number;

  @Column("int", { name: "invoice_id", unsigned: true })
  invoiceId: number;

  @Column("int", { name: "amount", unsigned: true })
  amount: number;

  @Column("text", { name: "name" })
  name: string;

  @Column("int", { name: "price", unsigned: true })
  price: number;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @ManyToOne(() => Invoice, (invoice) => invoice.items, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "invoice_id", referencedColumnName: "invoiceId" }])
  invoice: Invoice;
}
