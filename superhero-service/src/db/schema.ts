import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const superHeroesTable = pgTable("superheroes", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
});
