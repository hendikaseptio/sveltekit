import Database from 'better-sqlite3';
const db = new Database('local.db');

try {
    db.exec(`
        CREATE TABLE IF NOT EXISTS \`setting\` (
            \`id\` integer PRIMARY KEY AUTOINCREMENT,
            \`site_name\` text NOT NULL DEFAULT 'My SvelteKit Blog',
            \`site_logo\` text,
            \`theme\` text NOT NULL DEFAULT 'auto',
            \`address\` text,
            \`phone\` text,
            \`facebook\` text,
            \`instagram\` text,
            \`x\` text,
            \`updated_at\` integer
        );
    `);
    
    // Seed default settings if not exists
    const res = db.prepare("SELECT COUNT(*) as count FROM setting").get();
    if (res.count === 0) {
        db.prepare("INSERT INTO setting (site_name, theme) VALUES (?, ?)").run('My SvelteKit Blog', 'auto');
        console.log("Default settings seeded");
    }

    console.log("Database updated successfully with setting table");
} catch (e) {
    console.error("Error updating database:", e);
} finally {
    db.close();
}
