import { PrismaClient } from "../app/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL || "postgresql://phantom@localhost:5432/nexabot" });
const prisma = new PrismaClient({ adapter });

async function main() {
  const passwordHash = await bcrypt.hash("admin123", 12);

  const admin = await prisma.user.upsert({
    where: { email: "sayn.punithan@gmail.com" },
    update: {},
    create: {
      email: "sayn.punithan@gmail.com",
      name: "Sayn Punithan",
      passwordHash,
      role: "ADMIN",
    },
  });

  console.log("Admin user created:", admin.email);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
