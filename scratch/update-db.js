import Database from 'better-sqlite3';
const db = new Database('local.db');

try {
    db.exec(`
        CREATE TABLE IF NOT EXISTS \`category\` (
            \`id\` text PRIMARY KEY NOT NULL,
            \`name\` text NOT NULL,
            \`slug\` text NOT NULL,
            \`description\` text,
            \`created_at\` integer
        );
    `);
    
    try {
        db.exec("CREATE UNIQUE INDEX \`category_slug_unique\` ON \`category\` (\`slug\`);");
    } catch (e) {}

    const info = db.prepare("PRAGMA table_info(post)").all();
    if (!info.some(col => col.name === 'category_id')) {
        db.exec("ALTER TABLE \`post\` ADD \`category_id\` text;");
    }
    
    console.log("Database updated successfully");
} catch (e) {
    console.error("Error updating database:", e);
} finally {
    db.close();
}
