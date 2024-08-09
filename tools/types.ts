import { Transcripter } from "./classes/Transcripter.ts";

export type ClassType<T extends abstract new (transcripter:Transcripter) => InstanceType<T>> = new (transcripter:Transcripter) => InstanceType<T>;
