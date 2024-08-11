import { __dirname, directory, filename, GlobImport } from "./utils.ts";
import { Glob } from "./utils.ts";
import I18alt from "./I18alt.ts";
import { lodash } from "./utils.ts";
import { core } from "./classes/Loggings/Console.ts";
import { Transcripter } from "./classes/Transcripter.ts";
import { join } from "https://deno.land/std@0.178.0/path/posix.ts";
import { dirname } from "https://deno.land/std@0.178.0/path/mod.ts";
import { EggTranslator } from "./classes/EggTranslator.ts";
import { Readmaker } from "./classes/Readmaker.ts";

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
        const texts: string[] = [];
        texts.push("#");
        texts.push(`# This file is gerated of script "${script.name}"`);
        texts.push(`# Gerated Path: "${script.path}"`);
        texts.push(
            `# Root Path: "${directory(script.root).replaceAll("\\", "/")}"`,
        );
        script.static.forEach((stc) =>
            texts.push(`# Static Resource: "${stc.from}" to "${stc.to}"`)
        );
        texts.push("#\n");
        if (script.static.length > 0) {
            core.log(`Setting static resources of [${script.name}].green-b`);
            for await (const files of script.static) {
                const cvt = (s: string) => {
                    const news = s.replaceAll("{lang}", i18n.lg).replaceAll(
                        "{root}",
                        script.root,
                    ).replaceAll("\\", "/").replaceAll("/", "\\");
                    return news;
                };
                const results = await Glob([
                    files.from.replace("{root}/", ""),
                ], { root: script.root });
                for await (const path of results) {
                    core.log(
                        `Moving [${
                            filename(path).replaceAll("\\", "/")
                        }].blue-b to [${files.to}].blue-b`,
                    );
                    const to = cvt(join(Deno.cwd(), files.to));
                    const text = await Deno.readFile(path);
                    await Deno.mkdir(dirname(to), { recursive: true });
                    await Deno.writeFile(
                        to,
                        text,
                    );
                }
            }
        }
        script.raw += texts.join("\n");
        await script.run(script, i18n);
        const locale = join(Deno.cwd(), script.path.replace("{lang}", i18n.lg));
        await Deno.mkdir(dirname(locale), { recursive: true });
        await Deno.writeFile(locale, new TextEncoder().encode(script.raw));
    }
}
core.log("Loading eggs...");
await GlobImport(["eggs/**/*.ts"]);
core.log("Executing eggs...");
for await (const script of EggTranslator.all) {
    for await (const lang of I18alt.live.languages) {
        const i18n = new I18alt(lang);
        core.log(`Executing egg [${script.name}].green-b`);
        const data = await script.run(script, i18n);
        const locale = join(Deno.cwd(), script.path.replace("{lang}", i18n.lg));
        await Deno.mkdir(dirname(locale), { recursive: true });
        await Deno.writeFile(
            locale,
            new TextEncoder().encode(JSON.stringify(data, null, 2)),
        );
    }
}
core.log("Making readmes...");
const i18n = new I18alt();
const news = Readmaker.main_readme(i18n);
await Deno.writeFile(
    "./README.md",
    new TextEncoder().encode(news),
);
const docpath = "docs/{lang}/readme.md";
for await (const lang of I18alt.live.languages) {
    i18n.sl(lang);
    core.log(`Making readme of lang [${lang}].green-b`);
    const locale = join(Deno.cwd(), docpath.replace("{lang}", i18n.lg));
    Readmaker.lang_readme(i18n);
    await Deno.mkdir(dirname(locale), { recursive: true });
    await Deno.writeFile(
        locale,
        new TextEncoder().encode(Readmaker.md[i18n.lg]),
    );
}
core.log(`[Finished].green-b`);
