import AbstractEmbed from "./AbstractEmbed";
import EmbedField from "./EmbedField";
import EmbedInterface from "./EmbedInterface";

export default class FieldEmbed extends AbstractEmbed {
    fields: EmbedField[]

    constructor (options: EmbedInterface, fields) {
        super(options);
        this.fields = fields
    }

    getFields () { return this.fields }
}