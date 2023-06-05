import jsTokens from "js-tokens";
import Scenario from "scenarist.dev"
import punctuator from "./punctuator.js";

export default {
    $_director(play, line) {
        if (typeof (line) === "symbol") {
            return
        }

        const tokens = jsTokens(line)
        var output = []
        for (const token of tokens) {
            if (token.done) break;
            play(Symbol.for(token.type), token, output)
        }

        return output.map(token => token.formattedValue || token.value).join('')
    },

    $_IdentifierName(play, token, output) {
        // token.formattedValue = ' ' + token.value
        output.push(token)
    },
    $_WhiteSpace(play, token, output) {
        // token.formattedValue = ' ' + token.value
        output.push(token)
    },
    $_Punctuator: punctuator,
}

// TODO: add remaining token types

/*
    Notes:
        - . have whitespace before, no whitespace after
        - if token is at beggining of line, no whitespace
        - if toekn is at end of line, no whitespace
        - , and ; don't have whitespaces before
        - any of "(), {}, []" don't have whitespaces inside if empty, have before
        - : have whitespace after, except in ternay btengan -> before and after
        - operators have whitespace before and after
        - 
        all identifiers have spaces before except:
        - begging of line
        - if an identifier is superceded with a '.'
        - 

        
*/