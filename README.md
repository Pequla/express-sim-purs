# Simulator Usluga Poreske Uprave

> Osnovna putanja aplikacije je `https://sim.purs.singidunum.ac.rs`

Primer zaglavlja zahteva na `POST /api/invoice`
```ts
export interface InvoiceModel {
    indeks: string
    token: string
    customer: string
    address: string
    taxId: string | null
    items: {
        name: string
        amount: number,
        price: number
    }[]
}
```

Za indeks i token mi se obratite na MS Teams-u, oni ce biti Vaš broj indeksa (npr 2019200948)

Primer .env ako zelite sami hostovati app
```
SERVER_PORT=5800
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USERNAME=root
DATABASE_PASSWORD=root
DATABASE_NAME=sim_purs_psep
ADMIN_TOKEN=example_pass
```