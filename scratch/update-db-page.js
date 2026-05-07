import Database from 'better-sqlite3';
const db = new Database('local.db');

try {
    db.exec(`
        CREATE TABLE IF NOT EXISTS \`page\` (
            \`id\` text PRIMARY KEY NOT NULL,
            \`title\` text NOT NULL,
            \`slug\` text NOT NULL,
            \`content\` text NOT NULL,
            \`created_at\` integer
        );
    `);
    
    try {
        db.exec("CREATE UNIQUE INDEX \`page_slug_unique\` ON \`page\` (\`slug\`);");
    } catch (e) {}

    console.log("Database updated successfully with page table");
} catch (e) {
    console.error("Error updating database:", e);
} finally {
    db.close();
}
