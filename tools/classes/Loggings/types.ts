import { Bgc, Rgb } from "./Colors.ts";

export type LoggingsMessage = string | boolean | object | number

export const ColorsTxT = {
    red: Rgb(255, 0, 0),
    green: Rgb(0, 255, 0),
    lime: Rgb(128, 255, 128),
    blue: Rgb(0, 0, 255),
    yellow: Rgb(255, 255, 0),
    cyan: Rgb(0, 255, 255),
    magenta: Rgb(255, 0, 255),
    black: Rgb(0, 0, 0),
    white: Rgb(255, 255, 255),
    gray: Rgb(128, 128, 128),
    maroon: Rgb(128, 0, 0),
    olive: Rgb(128, 128, 0),
    navy: Rgb(0, 0, 128),
    purple: Rgb(128, 0, 128),
    teal: Rgb(0, 128, 128),
    silver: Rgb(192, 192, 192),
    indigo: Rgb(75, 0, 130),
    gold: Rgb(255, 215, 0),
    pink: Rgb(255, 192, 203),
    orange: Rgb(255, 165, 0),
    brown: Rgb(165, 42, 42),
    peach: Rgb(255, 218, 185),
    lavender: Rgb(230, 230, 250),
} as const;


export const ColorsBg = {
    bred: Bgc(255, 0, 0),
    bgreen: Bgc(0, 255, 0),
    blime: Bgc(128, 255, 128),
    bblue: Bgc(0, 0, 255),
    byellow: Bgc(255, 255, 0),
    bcyan: Bgc(0, 255, 255),
    bmagenta: Bgc(255, 0, 255),
    bblack: Bgc(0, 0, 0),
    bwhite: Bgc(255, 255, 255),
    bgray: Bgc(128, 128, 128),
    bmaroon: Bgc(128, 0, 0),
    bolive: Bgc(128, 128, 0),
    bnavy: Bgc(0, 0, 128),
    bpurple: Bgc(128, 0, 128),
    bteal: Bgc(0, 128, 128),
    bsilver: Bgc(192, 192, 192),
    bindigo: Bgc(75, 0, 130),
    bgold: Bgc(255, 215, 0),
    bpink: Bgc(255, 192, 203),
    borange: Bgc(255, 165, 0),
    bbrown: Bgc(165, 42, 42),
    bpeach: Bgc(255, 218, 185),
    blavender: Bgc(230, 230, 250),
} as const;

/**
 * Declared Colors
 */
export const LoggingsColors = {
    inverse: "\x1b[7m",
    none: "none",
    reset: "\x1b[0m",
    bold: "\x1b[1m",
    ...ColorsBg,
    ...ColorsTxT
} as const