import fs from 'fs';

export function readRegistry(path: string): { name: string, version: string }[] {
    let res: { name: string, version: string }[] = [];
    try {
        if (fs.existsSync(path)) {
            let ex = fs.readFileSync(path, 'utf8');
            let j = JSON.parse(ex);
            if (Array.isArray(j.packages)) {
                for (let p of j.packages) {
                    if (typeof p.name === 'string' && typeof p.version === 'string') {
                        res.push({ name: p.name, version: p.version });
                    }
                }
            }
        }
    } catch (e) {
        console.warn(e);
        res = [];
    }
    return res;
}

export function writeRegistry(path: string, registry: { name: string, version: string }[]) {
    fs.writeFileSync(path, JSON.stringify(registry));
}