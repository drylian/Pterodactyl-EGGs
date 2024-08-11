import I18alt from "../I18alt.ts";
import { gitRootRawURL } from "../utils.ts";
import { EggTranslator } from "./EggTranslator.ts";
import { Transcripter } from "./Transcripter.ts";
export interface Table {
    title: string;
    eggpath: string;
    description: string;
    amd: boolean;
    arm: boolean;
    arm_oracle: boolean;
}

export class Readmaker {
    public static md: Record<string, string> = {};
    public static all: Record<string, Table[]> = {};
    constructor(table: Table, i18n: I18alt) {
        if (!Readmaker.all[i18n.lg]) Readmaker.all[i18n.lg] = [];
        Readmaker.all[i18n.lg].push(table);
    }

    public static lang_readme(i18n: I18alt) {
        const line = (v: string) => Readmaker.md[i18n.lg] += `${v}\n`;
        i18n.use("All");
        line(i18n.t("ReadmeEggs"));
        line("|--|--|--|--|--|--|")
        line("").repeat(2);
        line(i18n.t("Table"));
        Readmaker.all[i18n.lg].forEach((table) => {
            line(
                `|${table.title} | [${i18n.t("SeeEgg")}](${
                    gitRootRawURL +
                    (table.eggpath.replaceAll("{langs}", i18n.lg))
                }) | ${table.amd ? "✅" : "❌"} | ${
                    table.arm ? "✅" : "❌"
                } | ${table.arm_oracle ? "✅" : "❌"} | ${table.description} |`,
            );
        });
        line("").repeat(2);
        line("[ ◀ Return ](../../README.md)");
        return Readmaker.md[i18n.lg];
    }
    public static main_readme(i18n: I18alt) {
        let md = `# Drylian Eggs
<div align="center">

![license-info](https://img.shields.io/github/license/drylian/Pterodactyl-EGGs?logo=gnu&style=for-the-badge&colorA=302D41&colorB=f9e2af&logoColor=f9e2af)
![stars-info](https://img.shields.io/github/stars/drylian/Pterodactyl-EGGs?colorA=302D41&colorB=f9e2af&style=for-the-badge)

![Last-Comitt](https://img.shields.io/github/last-commit/drylian/Pterodactyl-EGGs?style=for-the-badge&colorA=302D41&colorB=b4befe)
![Comitts Year](https://img.shields.io/github/commit-activity/y/drylian/Pterodactyl-EGGs?style=for-the-badge&colorA=302D41&colorB=f9e2af&logoColor=f9e2af)
![reposize-info](https://img.shields.io/github/repo-size/drylian/Pterodactyl-EGGs?style=for-the-badge&colorA=302D41&colorB=89dceb)

</div>

## Statistics Converted

- Total Eggs: ${EggTranslator.all.length * i18n.lgs.length}
- Total Langs: ${i18n.lgs.length}
- Total scripts: ${Transcripter.all.length * i18n.lgs.length}

## Statistics Base

- Eggs: ${EggTranslator.all.length}
- Langs: ${i18n.lgs.length}
- Scripts: ${Transcripter.all.length}

## Menu

| ✨ Language | Readme |
|--|--|
`;
        i18n.use("All");
        const line = (v: string) => md += `${v}\n`;
        Object.entries(Readmaker.all).forEach((lang) => {
            i18n.sl(lang[0]);
            line(
                `| ${i18n.t("lang")} |[${i18n.t("SeeReadme")}](${`./docs/${lang}/Readme.md`
                })|`,
            );
        });
        return md;
    }
}
