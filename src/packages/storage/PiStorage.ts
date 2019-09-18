import sqlite3 from 'sqlite3';

export class PiStorage {
    readonly db: sqlite3.Database;

    constructor(db: sqlite3.Database) {
        this.db = db;
        this.db.exec('CREATE TABLE IF NOT EXISTS "storage" ("value" TEXT PRIMARY KEY, "key" TEXT)');
    }

    async get<T = any>(key: string) {
        let res = await new Promise<any>((resolve, reject) => {
            this.db.get(`SELECT "value" from "storage" where "key" = ?;`, [key], (err, row) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(row)
                }
            });
        });
        if (!res) {
            return null;
        }
        return JSON.parse(res.value) as T;
    }

    async set(key: string, value: any) {
        let v = JSON.stringify(value);
        await new Promise<void>((resolve, reject) => {
            this.db.run(`INSERT OR REPLACE INTO "storage"("key", "value") VALUES (?, ?);`, [key, v], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}