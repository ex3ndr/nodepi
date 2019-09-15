import { PiStorage } from './storage/PiStorage';
class ContextHolder {
    storage!: PiStorage | undefined;

    setStorage(storage: PiStorage) {
        this.storage = storage;
    }
}

export const Context = new ContextHolder();