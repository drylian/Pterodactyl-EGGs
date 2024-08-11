import { Condition } from "../../classes/If/Condition.ts";
import { IsEqual } from "../../classes/If/Conditions.ts";
import { IfScripter } from "../../classes/If/IfScripter.ts";
import { Transcripter } from "../../classes/Transcripter.ts";
import { Logo } from "../../extends/logo.ts";

new Transcripter({
    name: "Execute Samp",
    version: "v2.0",
    root:import.meta.url,
    path: "Connected/Samp/{lang}/execute.sh",
    run(scripter, i18n) {
        scripter.bin("#!/bin/bash");
        const [players, lang] = scripter.vars("MAX_PLAYERS", "LANGUAGE");
        const arch = scripter.arch();
        Logo(scripter);
        i18n.use("Samp");

        scripter.echo(i18n.t("ArchChecker", { arch: arch }));
        scripter.echo(i18n.t("LangChecker"));
        scripter.echo(i18n.t("Initializ"));
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
