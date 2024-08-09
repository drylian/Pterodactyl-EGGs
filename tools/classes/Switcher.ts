import { Transcripter } from "./Transcripter.ts";

/**
 * Uses JavaScript to build shell commands with switch-case logic
 */
export class Switcher {
    private transcripter: InstanceType<typeof Transcripter>;
    private cases: { [key: string]: string[] } = {};

    constructor(transcripter: InstanceType<typeof Transcripter>) {
        this.transcripter = transcripter;
    }

    /**
     * Adds a case to the switch statement.
     * @param value The value to match for this case.
     * @param callback The function to execute if the case matches.
     */
    public case(value: string, callback: (transcripter: InstanceType<typeof Transcripter>, switcher: this) => void) {
        this.cases[value] = [];
        this.transcripter.raw += `case "${value}":\n`;
        callback(this.transcripter, this);
        this.transcripter.raw += `;;\n`;
    }

    /**
     * Adds a default case to the switch statement.
     * @param callback The function to execute if no other cases match.
     */
    public default(callback: (transcripter: InstanceType<typeof Transcripter>, switcher: this) => void) {
        this.transcripter.raw += `*)\n`;
        callback(this.transcripter, this);
        this.transcripter.raw += `;;\n`;
    }

    /**
     * Adds commands to the current case.
     * @param commands The commands to add to the current case.
     */
    public addCommands(...commands: string[]) {
        this.transcripter.raw += commands.map(command => `    ${command}\n`).join('');
    }

    /**
     * Generates the final switch-case script.
     * @returns The shell script as a string.
     */
    public done() {
        this.transcripter.raw += `esac\n`;
    }
}
