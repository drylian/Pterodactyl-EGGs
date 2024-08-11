import { Transcripter } from "./classes/Transcripter.ts";

export type ClassType<T extends abstract new (transcripter:Transcripter) => InstanceType<T>> = new (transcripter:Transcripter) => InstanceType<T>;

interface Meta {
    version: string;
    update_url: string | null;
}

interface DockerImages {
    [architecture: string]: string;
}

interface ConfigFiles {
    [filename: string]: {
        parser: string;
        find: { [key: string]: string };
    };
}

interface Startup {
    done: string;
    userInteraction: any[];
}

interface Logs {
    custom: boolean;
    location: string;
}

interface Scripts {
    installation: {
        script: string;
        container: string;
        entrypoint: string;
    };
}

interface Variable {
    name: string;
    description: string;
    env_variable: string;
    default_value: string;
    user_viewable: boolean;
    user_editable: boolean;
    rules: string;
    field_type: string;
}

export interface EggData {
    _comment: string;
    meta: Meta;
    exported_at: string;
    name: string;
    author: string;
    description: string;
    features: any | null;
    docker_images: DockerImages;
    file_denylist: string[];
    startup: string;
    config: {
        files: string;
        startup: Startup;
        logs: Logs;
        stop: string;
    };
    scripts: Scripts;
    variables: Variable[];
}