import Scenarist from "scenarist.dev";
import { createInterface } from "readline"

const play = Scenarist({
    $echo(play, ...line) {
        return 'this is a cli line: ' + line.join(' ')
    },
    $_director: "eh el 3abat da",
})

const cli = createInterface({ input: process.stdin, output: process.stdout })
cli.on("line", (line) => {
    console.log(play(...line.trim().split(/\s+/)))
})
