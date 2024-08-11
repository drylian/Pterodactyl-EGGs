import {
  expandGlob,
  ExpandGlobOptions,
} from "https://deno.land/std@0.178.0/fs/expand_glob.ts";
import {
  dirname,
  fromFileUrl,
  toFileUrl,
} from "https://deno.land/std@0.178.0/path/mod.ts";
import * as lodash41715Npm from "https://cdn.skypack.dev/lodash-es";
export function directory (path:string = import.meta.url) {
  const dir = dirname(path.startsWith("file") ? fromFileUrl(path) : path);
  return dir.replace(Deno.cwd(), "")
}
export function filename (path:string = import.meta.url) {
  const dir = path.startsWith("file") ? fromFileUrl(path) : path;
  return dir.replace(Deno.cwd(), "")
}
export const lodash = lodash41715Npm;
export const __dirname = dirname(fromFileUrl(import.meta.url));
export const rootDir = __dirname;
export const gitRootURL = "https://github.com/drylian/Pterodactyl-EGGs/";
export const gitRootRawURL = "https://raw.githubusercontent.com/drylian/Pterodactyl-EGGs/main/"
export async function Glob(
  patterns: string[],
  options: ExpandGlobOptions = { root: __dirname },
) {
  const files: string[] = [];

  for (const pattern of patterns) {
    for await (const file of expandGlob(pattern, options)) {
      files.push(file.path);
    }
  }

  return files;
}

/**
 * Import modules
 */
export async function GlobImport(
  paths: string[],
) {
  const pathers = await Glob(paths);
  for await (const pather of pathers) {
    for await (const entry of expandGlob(pather, { root: import.meta.url })) {
      await import(toFileUrl(entry.path).href);
    }
  }
}
