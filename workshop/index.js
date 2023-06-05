
import formatter from "./scenario.js"
import Scenarist from "scenarist.dev"

// function lineFormatter(line) {
//     const tokens = jsTokens(line.trim())
//     var formattedLine = ""
//     while (true) {
//         const token = tokens.next()
//         if (token.done) break;
//         console.log(token)
//         switch (token.value.type) {
//             case 'Punctuator':
//                 if (token.value.value === '.') {
//                     formattedLine += token.value.value
//                     break;
//                 }
//             default:
//                 formattedLine += token.value.value + ' '
//         }
//     }
//     // console.log(formattedLine)
//     return formattedLine
// }

const play = Scenarist(formatter)
const output = play('if (a+b) {echo hamada}')
console.log(output)