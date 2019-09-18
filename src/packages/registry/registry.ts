export class Registry {
    readonly packages: { name: string, schema: string, resolver: any, system: boolean }[] = [];

    add(pkg: { name: string, schema: string, resolver: any, system: boolean }) {
        this.packages.push(pkg);
    }
}