class ContextHolder {
    dataPath!: string;

    setDataPath(path: string) {
        this.dataPath = path;
    }
}

export const Context = new ContextHolder();