import { Transcripter } from "./Transcripter.ts";

/**
 * Uses JavaScript to build shell commands for user prompts.
 */
export class Question {
    private transcripter: InstanceType<typeof Transcripter>;

    constructor(transcripter: InstanceType<typeof Transcripter>) {
        this.transcripter = transcripter;
    }

    /**
     * Prompts the user with a question and stores the response in a variable.
     * @param question The question to prompt the user with.
     * @param variable The variable to store the user's response.
     */
    public ask(question: string, variable: string): void {
        this.transcripter.raw += `read -p "${question}" ${variable}\n`;
    }
}
