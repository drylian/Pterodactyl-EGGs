import { Condition } from "../classes/If/Condition.ts";
import { ExistDir, ExistFile } from "../classes/If/Conditions.ts";
import { IfScripter } from "../classes/If/IfScripter.ts";
import { Transcripter } from "../classes/Transcripter.ts";
import { Logo } from "../extends/logo.ts";

new Transcripter({
    name: "Samp",
    version:"v2.0",
    path: "Connected/{lang}/Samp/start.sh",
    run(scripter, i18n) {
        Logo(scripter);
        scripter.use(IfScripter, (ins) => {
            ins.if(
                new Condition(ExistDir("./Informations"))
                .and(ExistFile("./Informations/server"))
                .orElse(ExistDir("./Informations/server")),
                (scripter) => {
                    scripter.echo("Downloading file");
                },
            );
            ins.done();
        });
    },
});
