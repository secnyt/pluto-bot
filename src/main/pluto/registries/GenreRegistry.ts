import Registry from "../api/misc/Registry";
import Genre from "../api/genre/Genre";

export default class GenreRegistry extends Registry {
    static registry: any[] = []
    static shouldRegister (toRegister: Genre): boolean {
        if (this.registry.some(genre => genre.name == toRegister.name)) {
            throw 'Cannot register multiple genres under the same name!'
        }
        return true
    }
}