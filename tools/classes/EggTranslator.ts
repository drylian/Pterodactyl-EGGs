import I18alt from "../I18alt.ts";

interface EggTranslatorConstructor {
    name: string;
    path:string;
    run: (instance: EggTranslator, i18n: I18alt) => object | Promise<object>;
}
export class EggTranslator {
    public static all: EggTranslator[] = [];
    public readonly name: string;
    public readonly path:string;
    public readonly run: EggTranslatorConstructor["run"];
    constructor(opts: EggTranslatorConstructor) {
        this.name = opts.name;
        this.path =  opts.path;
        this.run = opts.run;
        EggTranslator.all.push(this);
    }
}
