import { SwitchCase } from "../../classes/SwitchCase.ts";
import { Transcripter } from "../../classes/Transcripter.ts";
import { gitRootRawURL } from "../../utils.ts";

new Transcripter({
    name: "Connect Samp",
    version: "v1.0",
    root:import.meta.url,
    path: "Connected/Samp/connect.sh",
    run(scripter, i18n) {
        scripter.bin("#!/bin/bash");
        const [lang] = scripter.vars("LANGUAGE");
        scripter.use(SwitchCase, (ins) => {
            const languages = i18n.lgs;
            ins.case(lang);
            languages.forEach((language) => {
                ins.is(
                    `"${language}"`,
                    (scr) => {
                        scr.bash( gitRootRawURL +`Connected/Samp/${language}/execute.sh`, );
                    },
                );
            });
            ins.default((scr)=> {
                scr.bash( gitRootRawURL +`Connected/Samp/pt-BR/execute.sh`, );
            })
            ins.done();
        });
    },
});
