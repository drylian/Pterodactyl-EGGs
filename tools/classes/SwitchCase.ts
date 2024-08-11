import { Transcripter } from "./Transcripter.ts";

/**
 * Uses JavaScript to build shell commands with switch-case logic
 */
export class SwitchCase {
    private transcripter: InstanceType<typeof Transcripter>;

    constructor(transcripter: InstanceType<typeof Transcripter>) {
        this.transcripter = transcripter;
    }

    /**
     * Adds a case to the switch statement.
     * @param value The value to match for this case.
     * @param callback The function to execute if the case matches.
     */
    public case(
        value: string,
    ) {
        this.transcripter.line(`case "${value}" in`);
        this.transcripter.spaces++;
    }

    public is(
        iscase: string,
        callback: (
            transcripter: InstanceType<typeof Transcripter>,
            switcher: this,
        ) => void,
    ) {
        this.transcripter.line(`${iscase})`);
        this.transcripter.spaces++;
        callback(this.transcripter, this);
        this.transcripter.line(`;;`);
        this.transcripter.spaces--;
    }

    /**
     * Adds a default case to the switch statement.
     * @param callback The function to execute if no other cases match.
     */
    public default(
        callback: (
            transcripter: InstanceType<typeof Transcripter>,
            switcher: this,
        ) => void,
    ) {
        this.transcripter.line(`*)`);
        this.transcripter.spaces++;
        callback(this.transcripter, this);
        this.transcripter.line(`;;`);
        this.transcripter.spaces--;
    }

    /**
     * Generates the final switch-case script.
     * @returns The shell script as a string.
     */
    public done() {
        this.transcripter.spaces--;
        this.transcripter.line(`esac`);
    }
}
