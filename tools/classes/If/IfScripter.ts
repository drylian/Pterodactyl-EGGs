import { Transcripter } from "../Transcripter.ts";
import { Condition } from "./Condition.ts";

/**
 * Uses JavaScript to build shell commands with conditional logic
 */
export class IfScripter {
    private transcripter: InstanceType<typeof Transcripter>;

    constructor(transcripter: InstanceType<typeof Transcripter>) {
        this.transcripter = transcripter;
    }

    /**
     * Adds an 'if' condition and executes the callback if the condition is true.
     * @param condition The condition to evaluate.
     * @param callback The function to execute if the condition is true.
     */
    public if(
        condition: InstanceType<typeof Condition>,
        callback: (
            transcripter: InstanceType<typeof Transcripter>,
            ifscripter: this,
        ) => void,
    ) {
        this.transcripter.raw += `if ${condition.toCommand()}; then\n`;
        callback(this.transcripter, this);
    }

    /**
     * Adds an 'elif' condition and executes the callback if the condition is true.
     * @param condition The condition to evaluate.
     * @param callback The function to execute if the condition is true.
     */
    public elif(
        condition: InstanceType<typeof Condition>,
        callback: (
            transcripter: InstanceType<typeof Transcripter>,
            ifscripter: this,
        ) => void,
    ) {
        this.transcripter.raw += `elif ${condition.toCommand()}; then\n`;
        callback(this.transcripter, this);
    }

    /**
     * Adds an 'else' block and executes the callback.
     * @param callback The function to execute if no previous conditions are met.
     */
    public else(callback: (transcripter: InstanceType<typeof Transcripter>, ifscripter: this) => void) {
        this.transcripter.raw += `else\n`;
        callback(this.transcripter, this);
    }

    /**
     * Generates the final shell script as a string.
     * @returns The shell script as a string.
     */
    public done() {
        this.transcripter.raw += `fi\n`;
    }
}
