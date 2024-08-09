import { Formatter } from "./Formatter.ts";
import { LoggingsMessage } from "./types.ts";
function time() {
    return `[${new Date().getHours()}:${new Date().getMinutes()}:${
        new Date().getSeconds()
    }].gray`;
}
export const core = {
    log: (...msgs: LoggingsMessage[]) =>
        console.log(Formatter([`[Info].blue-b ${time()} `, ...msgs])),
    warn: (...msgs: LoggingsMessage[]) => console.warn(Formatter([`[Warn].blue-b ${time()} `, ...msgs])),
    error: (...msgs: LoggingsMessage[]) => console.error(Formatter([`[Error].blue-b ${time()} `, ...msgs])),
    debug: (...msgs: LoggingsMessage[]) => console.debug(Formatter([`[Debug].blue-b ${time()} `, ...msgs])),
};
