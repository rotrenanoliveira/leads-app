### Leads Info

- [x] cadastro conta
- [x] login com magic link
- [x] root layout app
- [x] corrigir acesso a pagina inicial sem estar logado
- [x] cadastro de campanha
- [x] pagina de listagem de campanhas
- [ ] pagina de detalhes de campanha
- [ ] pagina de listagem de leads
- [ ] filtro de leads por campanha
- [ ] escrever termos de uso
- [ ] escrever política de privacidade

```ts

model Lead {
  id         String   @id
  campaignId String   @map("campaign_id")
  data       String
  createdAt  DateTime @default(now()) @map("created_at")

  campaign Campaign @relation(fields: [campaignId], references: [id])

  @@index([campaignId])
  @@map("leads")
}

```