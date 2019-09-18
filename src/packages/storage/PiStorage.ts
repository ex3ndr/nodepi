import * as ldb from 'leveldown';

export class PiStorage {
    readonly db: ldb.LevelDown;
    readonly openPromise: Promise<void>;

    constructor(root: string) {
        this.db = ldb.default(root + '/db');
        this.openPromise = new Promise((resolve, reject) => this.db.open(() => {
            resolve();
        }));
        // new sqlite3.Database((process.env.STORAGE_PATH || __dirname) + '/data.sqlite');
        // this.db = db;
        // this.db.exec('CREATE TABLE IF NOT EXISTS "storage" ("value" TEXT PRIMARY KEY, "key" TEXT)');
    }

    async get<T = any>(key: string) {
        await this.openPromise;
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
        await this.openPromise;
        // let v = JSON.stringify(value);
        // await new Promise<void>((resolve, reject) => {
        //     this.db.run(`INSERT OR REPLACE INTO "storage"("key", "value") VALUES (?, ?);`, [key, v], (err) => {
        //         if (err) {
        //             reject(err);
        //         } else {
        //             resolve();
        //         }
        //     });
        // });
    }
}