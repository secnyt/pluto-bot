import StringArgument from "./StringArgument";

export default class TrailingArgument extends StringArgument {
    constructor (name: string, required: boolean, index: number, ex?: string, type?: string) {
        super(name, required, index, ex || 'how are you?', type || 'trailingString');
    }
}