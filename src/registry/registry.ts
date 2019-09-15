export class Registry {
    readonly packages: { name: string, schema: string, resolver: any }[] = [];

    add(pkg: { name: string, schema: string, resolver: any }) {
        this.packages.push(pkg);
    }
}