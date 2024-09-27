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
        this.transcripter.line(`if ${condition.toCommand()}; then`);
        this.transcripter.spaces++;
        callback(this.transcripter, this);
        this.transcripter.spaces--;
        return this;
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
        this.transcripter.line(`elif ${condition.toCommand()}; then`);
        this.transcripter.spaces++;
        callback(this.transcripter, this);
        this.transcripter.spaces--;
        return this;
    }

    /**
     * Adds an 'else' block and executes the callback.
     * @param callback The function to execute if no previous conditions are met.
     */
    public else(
        callback: (
            transcripter: InstanceType<typeof Transcripter>,
            ifscripter: this,
        ) => void,
    ) {
        this.transcripter.line(`else`);
        this.transcripter.spaces++;
        callback(this.transcripter, this);
        this.transcripter.spaces--;
        return this;
    }

    /**
     * Generates the final shell script as a string.
     * @returns The shell script as a string.
     * @param force force spaces to 0
     */
    public done(force = false) {
        if(force) this.transcripter.spaces = 0;
        else this.transcripter.spaces--
        this.transcripter.line(`fi`);
        return this;
    }
}
