/**
 * A class for generating shell command conditions.
 */
export class Condition {
    private commands: {
        condition: string;
        type: "and" | "or" | "orElse" | "else";
    }[] = [];
    constructor(condition: string) {
        this.commands.push({ condition: condition, type: "and" });
    }

    /**
     * Adds an AND condition to the condition list.
     * @param condition The condition to add.
     * @returns The current instance of Condition for method chaining.
     */
    and(condition: string): this {
        this.commands.push({ condition, type: "and" });
        return this;
    }

    /**
     * Adds an OR condition to the condition list using -o.
     * @param condition The condition to add.
     * @returns The current instance of Condition for method chaining.
     */
    or(condition: string): this {
        this.commands.push({ condition, type: "or" });
        return this;
    }

    /**
     * Adds an OR condition to the condition list using ||.
     * @param condition The condition to add.
     * @returns The current instance of Condition for method chaining.
     */
    orElse(condition: string): this {
        this.commands.push({ condition, type: "orElse" });
        return this;
    }

    /**
     * Adds an ELSE condition.
     * @param condition The condition to add after the 'else'.
     * @returns The current instance of Condition for method chaining.
     */
    else(condition: string): this {
        this.commands.push({ condition, type: "else" });
        return this;
    }

    /**
     * Generates the complete shell command string for the conditions.
     * @returns The shell command string.
     */
    toCommand(): string {
        let command = "";
        this.commands.forEach((cmd, index) => {
            switch (cmd.type) {
                case "and":
                    command += ` -a ${cmd.condition}`;
                    break;
                case "or":
                    command += ` -o ${cmd.condition}`;
                    break;
                case "orElse":
                    if (index > 0) {
                        command += ` || ${cmd.condition}`;
                    } else {
                        command += ` ${cmd.condition}`;
                    }
                    break;
                case "else":
                    if (index === 0) {
                        command = `! (${command}) && ${cmd.condition}`;
                    } else {
                        command += ` && ${cmd.condition}`;
                    }
                    break;
            }
        });
        if (this.commands.length === 0) {
            return "";
        }
        return `(${command.trim()})`;
    }
}
