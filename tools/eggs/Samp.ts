import { EggTranslator } from "../classes/EggTranslator.ts";
import { Readmaker } from "../classes/Readmaker.ts";
import { EggData } from "../types.ts";
import egg from "./bases/samp-connect.json" with { type: "json"};

new EggTranslator({
    name: "EGG Samp",
    path: "Eggs/{lang}/samp-connected.json",
    run(_, i18n) {
        const NAMESPACE = "Eggs.SampConnected";
        i18n.use(NAMESPACE);
        egg.name = i18n.t("name");
        egg.description = i18n.t("description");
        const newDockers: Record<string, string> = {};
        Object.entries(egg.docker_images).forEach(([, docker], index) => {
            newDockers[i18n.t(`docker_images.[${index}]`)] = docker;
        });
        const scripts: EggData["config"]["startup"] = JSON.parse(
            egg.config.startup,
        );
        const varibles: EggData["variables"] = [];
        egg.variables.forEach((variable, index) => {
            if (variable.env_variable == "LANGUAGE") return; // ignore LANGUAGE variable
            const defaultv =
                i18n.t(`variables.[${index}].default_value`, {}, false) !==
                        `${NAMESPACE}.variables.[${index}].default_value`
                    ? i18n.t(`variables.[${index}].default_value`)
                    : variable.default_value;
            varibles.push({
                ...variable,
                name: i18n.t(`variables.[${index}].name`),
                description: i18n.t(`variables.[${index}].description`),
                default_value: defaultv,
            });
        });
        i18n.use("All");
        varibles.push({
            name:i18n.t("language"),
            description:i18n.t("description"),
            env_variable:"LANGUAGE",
            user_editable:true,
            user_viewable:true,
            default_value:i18n.lg,
            field_type: "text",
            rules:`required|string|in:${i18n.lgs.join(",")}`
        })
        
        i18n.use(NAMESPACE);
        egg.variables = varibles;
        egg.config.startup = JSON.stringify(scripts);
        scripts.done = i18n.t("done");
        egg.config.stop = i18n.t("stop");
        egg.docker_images = newDockers as typeof egg.docker_images;
        i18n.use("");
        new Readmaker({
            ...Object(i18n.t("table")),
            eggpath:_.path
        }, i18n);
        return egg;
    },
});
