/**
 * A class for generating shell command conditions.
 */
export class Condition {
    private conditions: {
      condition: string;
      type: "and" | "or";
    }[] = [];
  
    /**
     * Creates a new instance of Condition with the initial condition.
     * @param condition The initial condition.
     */
    constructor(condition: string) {
      this.conditions.push({ condition, type: "and" });
    }
  
    /**
     * Adds an AND condition to the condition list.
     * @param condition The condition to add.
     * @returns The current instance of Condition for method chaining.
     */
    and(condition: string): this {
      this.conditions.push({ condition, type: "and" });
      return this;
    }
  
    /**
     * Adds an OR condition to the condition list using ||.
     * @param condition The condition to add.
     * @returns The current instance of Condition for method chaining.
     */
    or(condition: string): this {
      this.conditions.push({ condition, type: "or" });
      return this;
    }
  
    /**
     * Generates the complete shell command string for the conditions.
     * @returns The shell command string.
     */
    toCommand(): string {
      const command = this.conditions.reduce((acc, current) => {
        switch (current.type) {
          case "and":
            return `${acc} ${this.conditions.length > 0 ? "&&" : ""} [ ${current.condition} ] `;
          case "or":
            return `${acc} ${this.conditions.length > 0 ? "||" : ""} [ ${current.condition} ] `;
        }
      }, "");
  
      return `(${command.trim()})`;
    }
  }