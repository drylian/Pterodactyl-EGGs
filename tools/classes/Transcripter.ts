import I18alt from "../I18alt.ts";
import { ClassType } from "../types.ts";
import { Formatter } from "./Loggings/Formatter.ts";
import { LoggingsMessage } from "./Loggings/types.ts";

/**
 * Interface defining the constructor options for the Transcripter class.
 */
interface TranscripterConstructor {
    /**
     * Name of the script.
     */
    name: string;
    
    /**
     * Path where the script will be generated.
     * The path can include language-specific segments for multi-language support.
     */
    path: string;
    
    /**
     * Version of script.
     */
    version: string;
    
    /**
     * Function that creates the script.
     * @returns A void or a Promise that resolves when the script is created.
     */
    run: (scripter: Transcripter, i18n:InstanceType<typeof I18alt>) => void | Promise<void>;
}

/**
 * Class responsible for generating and managing scripts.
 */
export class Transcripter {
    public static all:Transcripter[] = [];
    /**
     * The name of the script.
     */
    public readonly name: string;
    
    /**
     * The path where the script will be generated.
     */
    public readonly path: string;
    
    /**
     * Version of script.
     */
    public readonly version: string;

    /**
     * The raw script content.
     */
    public raw: string = "";
    
    /**
     * The function that creates the script.
     */
    public readonly run: (scripter: Transcripter, i18n:InstanceType<typeof I18alt>) => void | Promise<void>;
    
    /**
     * Creates an instance of the Transcripter class.
     * @param options The options for initializing the Transcripter.
     */
    constructor(options: TranscripterConstructor) {
        this.name = options.name;
        this.path = options.path;
        this.version = options.version;

        this.run = options.run;
        Transcripter.all.push(this);
    }

    /**
     * Generates an echo command with the given messages.
     * @param msgs The messages to echo.
     * @returns A string representing the echo command.
     */
    public echo(...msgs: LoggingsMessage[]) {
        this.raw += `echo "${Formatter(msgs)}"\n`;
    }

    /**
     * Generates a native command with the given command string.
     * @param command The command to include in the script.
     * @returns A string representing the native command.
     */
    public native(command: string) {
        this.raw += `${command}\n`;
    }

    /**
     * Generates a command to create a file with the specified name and optional content.
     * @param name The name of the file to create.
     * @param content Optional content to write into the file. If not provided, the file will be empty.
     * @returns A string representing the command to create the file.
     */
    public createFile(name: string, content?: string) {
        if (content) {
            // Creates the file with the specified content
            this.raw += `echo "${content.replace(/"/g, '\\"')}" > "${name}"\n`;
        } else {
            // Creates an empty file
            this.raw += `touch "${name}"\n`;
        }
    }

    /**
     * Generates a command to remove a file.
     * @param name The name of the file to remove.
     * @returns A string representing the command to remove the file.
     */
    public removeFile(name: string) {
        this.raw += `rm -f "${name}"\n`;
    }

    /**
     * Generates a command to append content to an existing file.
     * @param name The name of the file to append content to.
     * @param content The content to append.
     * @returns A string representing the command to append content to the file.
     */
    public appendToFile(name: string, content: string) {
        this.raw += `echo "${content.replace(/"/g, '\\"')}" >> "${name}"\n`;
    }

    /**
     * Generates a command to copy a file from source to destination.
     * @param source The source file path.
     * @param destination The destination file path.
     * @returns A string representing the command to copy the file.
     */
    public copyFile(source: string, destination: string) {
        this.raw += `cp "${source}" "${destination}"\n`;
    }

    /**
     * Generates a command to move a file from source to destination.
     * @param source The source file path.
     * @param destination The destination file path.
     * @returns A string representing the command to move the file.
     */
    public moveFile(source: string, destination: string) {
        this.raw += `mv "${source}" "${destination}"\n`;
    }

    /**
     * Generates a command to create a directory.
     * @param name The name of the directory to create.
     * @returns A string representing the command to create the directory.
     */
    public createDir(name: string) {
        this.raw += `mkdir -p "${name}"\n`;
    }

    /**
     * Generates a command to remove a directory.
     * @param name The name of the directory to remove.
     * @returns A string representing the command to remove the directory.
     */
    public removeDir(name: string): string {
        return `rm -rf "${name}"\n`;
    }

    /**
     * Generates a command to list files in a directory.
     * @param dir The directory to list files from.
     * @returns A string representing the command to list files.
     */
    public listFiles(dir: string) {
        this.raw += `ls "${dir}"\n`;
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
