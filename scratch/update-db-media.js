import Database from 'better-sqlite3';
const db = new Database('local.db');

try {
    db.exec(`
        CREATE TABLE IF NOT EXISTS \`media\` (
            \`id\` text PRIMARY KEY NOT NULL,
            \`name\` text NOT NULL,
            \`path\` text NOT NULL,
            \`type\` text NOT NULL,
            \`size\` integer NOT NULL,
            \`created_at\` integer
        );
    `);
    
    console.log("Database updated successfully with media table");
} catch (e) {
    console.error("Error updating database:", e);
} finally {
    db.close();
}
