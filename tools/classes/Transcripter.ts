import { dirname } from "https://deno.land/std@0.178.0/path/mod.ts";
import I18alt from "../I18alt.ts";
import { ClassType } from "../types.ts";
import { Formatter } from "./Loggings/Formatter.ts";
import { LoggingsMessage } from "./Loggings/types.ts";
import { fromFileUrl } from "https://deno.land/std@0.178.0/path/mod.ts";

/**
 * Interface defining the constructor options for the Transcripter class.
 */
interface TranscripterConstructor {
    /**
     * Name of the script.
     */
    name: string;

    /**
     * Static Resources paths
     */
    static?: { from: string; to: string }[];

    /**
     * Path where the script will be generated.
     * The path can include language-specific segments for multi-language support.
     * Args : {lang} | {version}
     */
    path: string;

    /**
     * Version of the script.
     */
    version: string;

    /**
     * root path of script.
     */
    root: string;

    /**
     * Function that creates the script.
     * @param scripter The Transcripter instance.
     * @param i18n The I18alt instance for internationalization.
     * @returns A void or a Promise that resolves when the script is created.
     */
    run: (
        scripter: Transcripter,
        i18n: InstanceType<typeof I18alt>,
    ) => void | Promise<void>;
}

/**
 * Class responsible for generating and managing scripts.
 */
export class Transcripter {
    public spaces = 0;
    /**
     * List of all Transcripter instances.
     */
    public static all: Transcripter[] = [];

    /**
     * The name of the script.
     */
    public readonly name: string;

    /**
     * The root path of the script.
     */
    public readonly root: string;

    /**
     * Static files of script
     */
    public readonly static: { from: string; to: string }[] = [];
    /**
     * The path where the script will be generated.
     */
    public readonly path: string;

    /**
     * Version of the script.
     */
    public readonly version: string;

    /**
     * The raw script content.
     */
    public raw: string = "";

    /**
     * Line maker.
     */
    public line(raw: string) {
        if (this.spaces < 0) this.spaces = 1; // reset
        this.raw += `${"    ".repeat(this.spaces)}${raw}\n`;
    }

    /**
     * The function that creates the script.
     */
    public readonly run: (
        scripter: Transcripter,
        i18n: InstanceType<typeof I18alt>,
    ) => void | Promise<void>;

    /**
     * Creates an instance of the Transcripter class.
     * @param options The options for initializing the Transcripter.
     */
    constructor(options: TranscripterConstructor) {
        this.name = options.name;
        this.path = options.path;
        this.root = dirname(fromFileUrl(options.root));
        if (options.static) this.static.push(...options.static);
        this.version = options.version;
        this.run = options.run;
        Transcripter.all.push(this);
    }

    /**
     * Declare vars, not genereted in code, only javascript.
     * @param _vars The names of the variables.
     * @returns An array of variable references formatted as $var.
     */
    public vars(..._vars: string[]): string[] {
        const result: string[] = [];
        _vars.forEach((v) => result.push(`$${v}`));
        return result;
    }

    /**
     * Adds a variable assignment to the raw script content.
     * @param _var The name of the variable.
     * @param value The value to assign to the variable.
     * @returns A string representing the variable reference.
     */
    public var(_var: string, value: string): string {
        _var = _var.replace("$", "");
        this.line(`${_var}=${value};`);
        return `$${_var}`;
    }

    /**
     * Adds a command to determine architecture type to the raw script content.
     * @param _var The name of the variable to store the architecture type. Defaults to "ARCH".
     * @returns A string representing the variable reference.
     * ARCHS : "amd64" | "arm64"
     */
    public arch(_var: string = "ARCH"): string {
        this.line(
            `${_var}=$([ "$(uname -m)" == "x86_64" ] && echo "amd64" || echo "arm64")`,
        );
        return `$${_var}`;
    }

    /**
     * Generates an echo command with the given messages.
     * @param msgs The messages to echo.
     */
    public echo(...msgs: LoggingsMessage[]): void {
        this.line(`echo "${Formatter(msgs)}";`);
    }

    /**
     * Adds a native command to the raw script content.
     * @param command The command to include in the script.
     */
    public native(command: string): void {
        this.line(`${command};`);
    }

    /**
     * Generates a command to create a file with the specified name and optional content.
     * @param name The name of the file to create.
     * @param content Optional content to write into the file. If not provided, the file will be empty.
     */
    public createFile(name: string, content?: string): void {
        if (content) {
            // Creates the file with the specified content
            this.line(`echo "${content.replace(/"/g, '\\"')}" > "${name}"`);
        } else {
            // Creates an empty file
            this.line(`touch "${name}"`);
        }
    }

    /**
     * Gets content of path file and save in _var. 
     * If the file doesn't exist, save def in _var.
     */
    public read(_var: string, path: string, def: string = "") {
        const __var = _var.startsWith("$") ? _var : `$${_var}`;
        this.line(`if [ -f "${path}" ]; then ${__var}=$(<"${path}"); else ${__var}="${def}"; fi`);
        return __var;
    }

    /**
     * Gets content of a remote file from a URL and saves it in _var.
     * If the URL is not accessible, saves a default value in _var.
     */
    public getcontent(_var: string, url: string, def: string = "") {
        const __var = _var.startsWith("$") ? _var : `$${_var}`;
        this.line(`if curl --silent --fail "${url}" > /dev/null; then ${__var}=$(curl --silent "${url}"); else ${__var}="${def}"; fi`);
        return __var;
    }


    /**
     * Generates a command to remove .
     * @param name The name of the file to remove.
     */
    public rm(name: string): void {
        this.line(`rm -rf "${name}"`);
    }

    /**
     * Generates a command to append content to an existing file.
     * @param name The name of the file to append content to.
     * @param content The content to append.
     */
    public appendToFile(name: string, content: string): void {
        this.line(`echo "${content.replace(/"/g, '\\"')}" >> "${name}"`);
    }

    /**
     * Generates a command to copy a file from source to destination.
     * @param source The source file path.
     * @param destination The destination file path.
     */
    public copyFile(source: string, destination: string): void {
        this.line(`cp "${source}" "${destination}"`);
    }

    /**
     * Generates a command to move a file from source to destination.
     * @param source The source file path.
     * @param destination The destination file path.
     */
    public moveFile(source: string, destination: string): void {
        this.line(`mv "${source}" "${destination}"`);
    }

    /**
     * Generates a command to create a directory.
     * @param name The name of the directory to create.
     */
    public createDir(name: string): void {
        this.line(`mkdir -p "${name}"`);
    }

    /**
     * Generates a command to list files in a directory.
     * @param dir The directory to list files from.
     */
    public listFiles(dir: string): void {
        this.line(`ls "${dir}"`);
    }

    /**
     * Download file
     * @param file Filename
     * @param url Url of Download
     * @returns Filename
     */
    public download(file: string, url: string) {
        this.line(`curl -L -o "${file}" "${url}"`);
        return file;
    }

    /**
     * Execute bash command, using file or url
     * @param urlorfile
     */
    public bash(urlorfile: string) {
        if (urlorfile.startsWith("http")) {
            const url = `bash <(curl -s ${urlorfile});`;
            this.line(url);
        } else this.line(`bash ${urlorfile};`);
    }

    public bin(type: "#!/bin/bash" | "#!/bin/ash" = "#!/bin/bash") {
        this.line(type);
    }

    /**
     * Uses a provided scripter class to create an instance and execute a callback with it.
     * @param T The type of the scripter class.
     * @param scripter The class constructor to create an instance of.
     * @param callback The function to execute with the created instance.
     */
    public use<T extends ClassType<T>>(
        scripter: T,
        callback: (ins: InstanceType<T>) => void,
    ): void {
        const instance = new scripter(this);
        callback(instance as InstanceType<T>);
    }
}
