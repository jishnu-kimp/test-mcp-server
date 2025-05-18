import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
async function main() {
    await db.sale.createMany({
        data: [
            { product: "Widget A", amount: 120.5, region: "North" },
            { product: "Widget B", amount: 75.0, region: "South" },
            { product: "Widget C", amount: 200.0, region: "East" },
        ],
    });
}
main().catch(console.error).finally(() => process.exit(0));
