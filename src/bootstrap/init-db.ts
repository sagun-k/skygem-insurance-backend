import prisma  from "../prisma.js";
import bcrypt from "bcrypt";

export async function initDatabase() {
    try {
        console.log("📡 Connecting to database...");
        await prisma.$connect();
        console.log("✅ Connected to database.");
        console.log("🔧 Checking DB and seeding defaults...");
        const existing = await prisma.user.findUnique({
            where: { email: "user@skygem.com" },
        });

        if (!existing) {
            const hashedPassword = await bcrypt.hash("user123", 10);
            await prisma.user.create({
                data: {
                    email: "user@skygem.com",
                    password: hashedPassword,
                },
            });
            console.log("✅ Default user created: user@skygem.com / user123");
        } else {
            console.log("✅ Default user already exists.");
        }
    } catch (err) {
        console.error("❌ Failed to initialize DB:", err);
    }
}
