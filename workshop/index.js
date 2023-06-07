import Formatter from "./scenario.js";
import Scenarist from "scenarist.dev";
import jsTokens from "js-tokens";

const play = Scenarist(new Formatter());
const output = play("    setting.location = [...location, direction];");
console.log(output);
