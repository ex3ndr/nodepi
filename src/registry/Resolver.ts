import { Context } from './../context';
export const RegistryResolver = {
    Package: {
        name: (src: string) => src
    },
    Query: {
        packages: async () => {
            return ((await Context.storage.get<{ packages: string[] }>('system.packages')) || { packages: [] }).packages;
        }
    },
    Mutation: {
        addPackage: async (_: any, args: { name: string }) => {
            const packages = ((await Context.storage.get<{ packages: string[] }>('system.packages')) || { packages: [] }).packages;
            await Context.storage.set('system.packages', { packages: [...packages, args.name] })
            return name;
        }
    }
}