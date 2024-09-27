/**
 * Checks if a file exists.
 * @param path The path to the file
 * @returns A shell command string
 */
export function ExistFile(path: string): string {
    return `-e "${path}"`;
}

/**
 * Checks if a file dont exists.
 * @param path The path to the file
 * @returns A shell command string
 */
export function NotExistFile(path: string): string {
    return `! -e "${path}"`;
}

/**
 * Generates a shell command string to check if a variable has a value.
 * @param variable The variable name.
 * @returns A shell command string.
 */
export function variableHasValueCommand(variable: string): string {
    return `-n "${variable}"`;
}

/**
 * Checks if a directory exists.
 * @param path The path to the directory
 * @returns A shell command string
 */
export function ExistDir(path: string): string {
    return `-d "${path}"`;
}

/**
 * Checks if a directory exists.
 * @param path The path to the directory
 * @returns A shell command string
 */
export function NotExistDir(path: string): string {
    return `! -d "${path}"`;
}


/**
 * Checks if two values are equal.
 * @param value1 The first value
 * @param value2 The second value
 * @returns A shell command string
 */
export function IsEqual(value1: string, value2: string): string {
    return `"${value1}" == "${value2}"`;
}

/**
 * Checks if two values are not equal.
 * @param value1 The first value
 * @param value2 The second value
 * @returns A shell command string
 */
export function IsNotEqual(value1: string, value2: string): string {
    return `"${value1}" != "${value2}"`;
}

/**
 * Checks if a file is readable.
 * @param path The path to the file
 * @returns A shell command string
 */
export function IsFileReadable(path: string): string {
    return `-r "${path}"`;
}

/**
 * Checks if a file is writable.
 * @param path The path to the file
 * @returns A shell command string
 */
export function IsFileWritable(path: string): string {
    return `-w "${path}"`;
}

/**
 * Checks if a file is executable.
 * @param path The path to the file
 * @returns A shell command string
 */
export function IsFileExecutable(path: string): string {
    return `-x "${path}"`;
}

/**
 * Checks if a path is a symbolic link.
 * @param path The path to check
 * @returns A shell command string
 */
export function IsSymbolicLink(path: string): string {
    return `-L "${path}"`;
}

/**
 * Checks if a file is empty.
 * @param path The path to the file
 * @returns A shell command string
 */
export function IsFileEmpty(path: string): string {
    return `! -s "${path}"`;
}

/**
 * Checks if a directory is empty.
 * @param path The path to the directory
 * @returns A shell command string
 */
export function IsDirEmpty(path: string): string {
    return `! "$(ls -A "${path}")"`;
}

/**
 * Checks if a file has been modified within the last N days.
 * @param path The path to the file
 * @param days Number of days
 * @returns A shell command string
 */
export function IsFileModifiedWithinDays(path: string, days: number): string {
    return `$(find "${path}" -mtime -${days} -print)`;
}

/**
 * Checks if a file is owned by a specific user.
 * @param path The path to the file
 * @param user The username
 * @returns A shell command string
 */
export function IsFileOwnedBy(path: string, user: string): string {
    return `"$(stat -c '%U' "${path}")" == "${user}"`;
}

/**
 * Checks if a directory contains a specific file.
 * @param dir The directory path
 * @param file The file name
 * @returns A shell command string
 */
export function DoesDirContainFile(dir: string, file: string): string {
    return `-f "${dir}/${file}"`;
}

/**
 * Checks if a file has a specific extension.
 * @param path The path to the file
 * @param ext The file extension
 * @returns A shell command string
 */
export function HasFileExtension(path: string, ext: string): string {
    return `"${path}" == *"${ext}"`;
}

/**
 * Checks if a variable is set (not empty).
 * @param varName The name of the variable
 * @returns A shell command string
 */
export function IsVarSet(varName: string): string {
    return `-n "${!varName}"`;
}

/**
 * Checks if a file is larger than a specified size in bytes.
 * @param path The path to the file
 * @param size The size in bytes
 * @returns A shell command string
 */
export function IsFileLargerThan(path: string, size: number): string {
    return `$(stat -c '%s' "${path}") -gt ${size}`;
}

/**
 * Checks if a file is smaller than a specified size in bytes.
 * @param path The path to the file
 * @param size The size in bytes
 * @returns A shell command string
 */
export function IsFileSmallerThan(path: string, size: number): string {
    return `$(stat -c '%s' "${path}") -lt ${size}`;
}

/**
 * Checks if a directory has a specific number of files.
 * @param dir The directory path
 * @param count The number of files
 * @returns A shell command string
 */
export function DoesDirContainNumFiles(dir: string, count: number): string {
    return `$(ls -1 "${dir}" | wc -l) -eq ${count}`;
}

/**
 * Checks if a file contains a specific string.
 * @param path The path to the file
 * @param string The string to search for
 * @returns A shell command string
 */
export function DoesFileContainString(path: string, string: string): string {
    return `grep -q "${string}" "${path}"`;
}

/**
 * Checks if a directory is writable.
 * @param path The path to the directory
 * @returns A shell command string
 */
export function IsDirWritable(path: string): string {
    return `-w "${path}"`;
}
