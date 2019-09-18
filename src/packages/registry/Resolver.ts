import { Context } from '../api/context';
import { readRegistry, writeRegistry } from './storage';

export const RegistryResolver = {
    Package: {
        name: (src: { name: string, version: string }) => src.name,
        version: (src: { name: string, version: string }) => src.version,
    },
    Query: {
        packages: async () => {
            return readRegistry(Context.dataPath + '/registry.json');
        }
    },
    Mutation: {
        addPackage: async (_: any, args: { name: string, version: string }) => {
            const pkg = { name: args.name, version: args.version };
            let packages = readRegistry(Context.dataPath + '/registry.json');
            packages = [...packages, pkg];
            writeRegistry(Context.dataPath + '/registry.json', packages);
            return pkg;
        },
        restartServer: () => {
            setTimeout(() => {
                process.exit(0);
            }, 1000);
            return true;
        }
    }
}