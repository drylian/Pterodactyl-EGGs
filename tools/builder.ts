import { __dirname, GlobImport } from "./utils.ts";
import { Glob } from "./utils.ts";
import I18alt from "./I18alt.ts";
import { lodash } from "./utils.ts";
import { core } from "./classes/Loggings/Console.ts";
import { Transcripter } from "./classes/Transcripter.ts";
import { join } from "https://deno.land/std@0.178.0/path/posix.ts";

core.log("Loading langs...");
const langspath = await Glob(["langs/**/*.json"], {
    root: Deno.cwd(),
});

for await (const lang of langspath) {
    const path = lang.replace(Deno.cwd() + "\\langs\\", "");
    const locale = path.replace(
        ".json",
        "",
    ).replace(/[/\\]/g, ".");
    const text = new TextDecoder().decode(await Deno.readFile(lang));
    const data = lodash.set({}, locale.split("."), JSON.parse(text));
    I18alt.core = lodash.merge(I18alt.core, data);
}
core.log("Loading scripts...");
await GlobImport(["scripts/**/*.ts"]);
core.log("Executing scripts...");
for await (const script of Transcripter.all) {
    for await (const lang of I18alt.live.languages) {
        const i18n = new I18alt(lang);
        core.log(`Executing script [${script.name}].green-b`);
        await script.run(script, i18n);
        const locale = join(Deno.cwd(), script.path.replace("{lang}", i18n.lg));
        await Deno.mkdir(locale, { recursive: true });
        await Deno.writeFile(locale + `/${script.name}.sh`, new TextEncoder().encode(script.raw));
    }
}
core.log(`[Finished].green-b`);