import Scenarist from "scenarist.dev";
import { createInterface } from "readline"

const scenario = class Scenario {
    // $location(play) {
    //     console.log(play(this.stamp))
    // }

    $create(play, direction) {
        this['$' + direction] = new Scenario(this.stamp)
    }

    $setting(play) {
        return play(this.stamp)
    }

    constructor(stamp) {
        this.stamp = stamp
    }
}

const play = Scenarist(new scenario("coco wawa"), { stamp: "coco wawa" })

const cli = createInterface({ input: process.stdin, output: process.stdout })
cli.on("line", (line) => {
    console.log(play(...line.trim().split(/\s+/)))
})