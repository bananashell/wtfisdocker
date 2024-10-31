import { drizzle } from "drizzle-orm/node-postgres";
import { superHeroesTable } from "./src/db/schema";
import { Elysia, t, error } from "elysia";
import { swagger } from "@elysiajs/swagger";

const db = drizzle(process.env.DATABASE_URL!);
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;

const app = new Elysia()
    .use(
        swagger({
            documentation: {
                info: { title: "Superhero Service", version: "1.0" },
            },
        })
    )
    .get("/", () => "Hello Elysia")
    .get("/superheroes", async () => {
        const allSuperHeroes = await db.select().from(superHeroesTable);
        return { superheroes: allSuperHeroes };
    })
    .post(
        "/superheroes",
        async ({ body: { name } }) => {
            if (!name) {
                return error("Bad Request", "Name is required");
            }

            try {
                const a = await db.insert(superHeroesTable).values({ name });

                return {
                    message: `${a.rowCount} superheroes added successfully`,
                };
            } catch (err) {
                return error("Internal Server Error", err);
            }
        },
        {
            body: t.Object({ name: t.String() }),
        }
    )
    .listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
