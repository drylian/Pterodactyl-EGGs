import { Condition } from "../classes/If/Condition.ts";
import {
    IsEqual,
    IsNotEqual,
    NotExistDir,
    NotExistFile,
} from "../classes/If/Conditions.ts";
import { IfScripter } from "../classes/If/IfScripter.ts";
import { SwitchCase } from "../classes/SwitchCase.ts";
import { Transcripter } from "../classes/Transcripter.ts";
import { Logo } from "../extends/logo.ts";
import { gitRootRawURL } from "../utils.ts";
import { mkdirSync } from "node:fs";
const SAMP_LATEST = "1.5v";

mkdirSync("./Connected/Samp", { recursive: true });

await Deno.writeFile(
    "./Connected/Samp/latest_version",
    new TextEncoder().encode(SAMP_LATEST),
);

new Transcripter({
    name: "Connect Samp",
    version: SAMP_LATEST,
    root: import.meta.url,
    path: "Connected/Samp/connect.sh",
    run(scripter, i18n) {
        scripter.bin("#!/bin/bash");
        const [lang] = scripter.vars("LANGUAGE");
        const version = scripter.read("VERSION", "./.infos/version", "latest");

        const latest_version = scripter.getcontent(
            "LATEST_VERSION",
            gitRootRawURL +
                `Connected/Samp/latest_version`,
            "latest",
        );

        scripter.echo(`[Version].green [${version}].green`);

        scripter.use(IfScripter, (ins) => {
            ins.if(
                new Condition(NotExistDir("./infos")),
                () => scripter.createDir("./infos"),
            ).done(true);

            ins.if(
                new Condition(IsNotEqual(version, latest_version)),
                (scripter) => {
                    scripter.echo(
                        `[Update].green [${version}].blue > [${latest_version}].green`,
                    );
                    scripter.createFile("./infos/version", latest_version);
                    scripter.var(version, latest_version);
                },
            ).done(true);
        });

        scripter.use(SwitchCase, (ins) => {
            const languages = i18n.lgs;
            ins.case(lang);
            languages.forEach((language) => {
                ins.is(
                    `"${language}"`,
                    (scr) => {
                        scr.bash(
                            gitRootRawURL +
                                `Connected/Samp/${language}/${version}/execute.sh`,
                        );
                    },
                );
            });
            ins.default((scr) => {
                scr.bash(
                    gitRootRawURL +
                        `Connected/Samp/pt-BR/${scripter.version}/execute.sh`,
                );
            });
            ins.done();
        });
    },
});

new Transcripter({
    name: "Execute Samp",
    version: SAMP_LATEST,
    root: import.meta.url,
    path: "Connected/Samp/{lang}/{version}/execute.sh",
    run(scripter, i18n) {
        scripter.bin("#!/bin/bash");
        const [players, lang] = scripter.vars("MAX_PLAYERS", "LANGUAGE");
        const arch = scripter.arch();
        function checkandinstall(file: string, url: string) {
            scripter.use(IfScripter, (ins) => {
                ins.if(
                    new Condition(
                        NotExistFile(`./infos/${file + "_installed"}`),
                    ).or(NotExistFile(file)),
                    () => {
                        scripter.echo(
                            `[Install].green [${file}].blue > [${url}`,
                        );
                        scripter.download(file, url);
                    },
                );
            });
        }
        Logo(scripter);
        i18n.use("Samp");

        scripter.echo(i18n.t("ArchChecker", { arch: arch }));
        scripter.echo(i18n.t("LangChecker"));
        scripter.echo(i18n.t("Initialize"));
        scripter.use(IfScripter, (ins) => {
            ins.if(
                new Condition(IsEqual(arch, "amd64")),
                (scripter) => {
                    scripter.echo("Downloading file");
                },
            );
            ins.done();
        });
    },
});
