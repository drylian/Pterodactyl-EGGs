import { Transcripter } from "./Transcripter.ts";

/**
 * Uses JavaScript to build shell commands with a while loop.
 */
export class While {
    private transcripter: InstanceType<typeof Transcripter>;

    constructor(transcripter: InstanceType<typeof Transcripter>) {
        this.transcripter = transcripter;
    }

    /**
     * Adds a 'while' condition and executes the callback with commands to run inside the loop.
     * @param condition The condition to evaluate.
     * @param callback The function to execute while the condition is true.
     */
    public while(
        condition: string,
        callback: (transcripter: InstanceType<typeof Transcripter>, whileDo: this) => void,
    ) {
        this.transcripter.raw += `while ${condition}; do\n`;
        callback(this.transcripter, this);
        this.transcripter.raw += `done\n`;
    }
}
