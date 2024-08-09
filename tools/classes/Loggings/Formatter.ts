import { LoggingsColors, LoggingsMessage } from "./types.ts";
import { Colors } from "./Colors.ts";

export function Formatter(messages: LoggingsMessage[]) {
    let message_csl: string = "";

    /**
     * Transform Colors for Console
     */
    messages.forEach((message) => {
        if (typeof message === "string") {
            const colorTagPattern = /\[([^\]]+)\]\.(\w+)(-b)?/g;
            message_csl += message.replace(
                colorTagPattern,
                (_, text, color, bold) => {
                    const formattedText = bold ? Colors("bold", text) : text;
                    if (Object.keys(LoggingsColors).includes(color)) {
                        return Colors(color, formattedText);
                    } else {
                        return Colors(
                            "cyan",
                            formattedText,
                        );
                    }
                },
            );
        } else if (typeof message === "number") {
            message_csl += ` ${Colors("blue", message)}`;
        } else if (typeof message === "boolean") {
            message_csl += ` ${
                message ? Colors("blue", "true") : Colors("red", "false")
            }`;
        } else if (typeof message === "object") {
            message_csl += ` ${Colors("green", JSON.stringify(message))}`;
        } else {
            message_csl += ` ${message}`;
        }
    });

    return message_csl;
}
