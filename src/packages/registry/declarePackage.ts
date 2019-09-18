import * as fs from 'fs';

export function declarePackage(name: string, directory: string, resolver: any, isSystem: boolean = false) {
    const schema = fs.readFileSync(directory, 'utf8');
    return {
        name,
        schema, resolver,
        system: isSystem
    };
}