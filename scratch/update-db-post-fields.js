import Database from 'better-sqlite3';
const db = new Database('local.db');

try {
    db.exec(`
        ALTER TABLE \`post\` ADD COLUMN \`cover\` text;
        ALTER TABLE \`post\` ADD COLUMN \`status\` text NOT NULL DEFAULT 'draft';
    `);
    
    console.log("Database updated successfully with new post fields");
} catch (e) {
    console.error("Error updating database:", e);
} finally {
    db.close();
}
