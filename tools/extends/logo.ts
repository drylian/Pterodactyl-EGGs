import { Transcripter } from "../classes/Transcripter.ts";

/**
 * @returns Random color of loggings
 */
export function Crd(): string {
    const colorKeys = [
      "red", "green", "lime", "blue", "yellow", "cyan", "magenta", "black", "white", "gray",
      "maroon", "olive", "navy", "purple", "teal", "silver", "indigo", "gold", "pink", "orange",
      "brown", "peach", "lavender", "inverse",
      "none", "reset", "bold"
    ];
    const now = Date.now();
    const lastTwoDigits = now % 100;
    const index = lastTwoDigits % colorKeys.length;
    return colorKeys[index];
  }

export function Logo(app:Transcripter) {
    app.echo("----------------------------------------------------------------")

    app.echo("")
    app.echo(`	[░█▀▀▄ ░█▀▀█ ░█▄ ▄█].${Crd()}-b [░█▀▀▀ ░█▀▀▀ ░█▀▀▀ ░█▀▀▀].${Crd()}-b`)
    app.echo(`	[░█  █ ░█▀▀▄  ░▀█▀ ].${Crd()}-b [░█▀▀▀ ░█░▀█ ░█░▀█ ░▀▀▀█].${Crd()}-b`)
    app.echo(`	[░▀▀▀  ░▀  ▀   ░▀  ].${Crd()}-b [░▀▀▀▀ ░▀▀▀▀ ░▀▀▀▀ ░▀▀▀ ].${Crd()}-b [${app.name}].cyan-b [${app.version}].magenta-b`)
    app.echo("")
    app.echo("----------------------------------------------------------------")
}