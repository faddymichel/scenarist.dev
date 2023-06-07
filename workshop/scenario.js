import jsTokens from "js-tokens";
import Scenario from "scenarist.dev";
import punctuator from "./punctuator.js";

const left = {
  "]": "[",
  ")": "(",
  "}": "{",
};

export default class Formatter {
  output = [[]];
  $_director(play, line) {
    // const  formatter  = this;
    // const { output } = formatter;

    if (typeof line === "symbol") {
      return;
    }

    const tokens = jsTokens(line.trim());
    for (const token of tokens) {
      if (token.done) break;
      console.log(token);
      // push new line if last token was one of {[(;
      // if (
      //   output.length > 0 &&
      //   [";", "(", "[", ")", "}", "]"].includes(output[output.length - 1].value)
      // ) {
      //   output.push({ type: "Punctuator", value: "\n" });
      // }

      play(Symbol.for(token.type), token, this.output);
    }
    return this.output
      .map((line) =>
        line.map((token) => token.formattedValue || token.value).join("")
      )
      .join("\n");
  }

  $_IdentifierName(play, token) {
    const { output } = this;

    if (output.length === 0) {
      output.push([]);
    }

    const line = output.pop();
    const lastToken = line.pop();

    if (lastToken && lastToken.value !== "." && lastToken.value !== "?.") {
      token.formattedValue = " " + token.value;
    }

    if (lastToken) {
      line.push(lastToken);
    }

    line.push(token);
    output.push(line);
    // console.log("logggg");
    // console.log(output);
  }

  // $_WhiteSpace(play, token, output) {
  //   // skipped
  // }

  $_Punctuator(play, token) {
    const { output } = this;
    if (output.length === 0) {
      output.push([]);
    }

    const line = output.pop();
    const lastToken = line.pop();
    if (lastToken === undefined) {
      line.push(token);
    }

    switch (token.value) {
      case ":":
        const nextToLastToken = line.pop();
        if (
          lastToken.type !== "IdentifierName" ||
          !["{", ","].includes(nextToLastToken?.value)
        ) {
          token.formattedValue = " " + token.value;
        }

        if (nextToLastToken) {
          line.push(nextToLastToken);
        }

        break;

      case ("--", "++"):
        if (lastToken?.type === "IdentifierName") break;

      case ";":
      case ",":
        break;

      case "[":
        if (lastToken?.value !== "?.") {
          token.formattedValue = " " + token.value;
        }

        break;

      case ("]", ")", "}"):
        if (lastToken?.value !== left[token.value]) {
          token.formattedValue = " " + token.value;
        }

        break;

      default:
        token.formattedValue = " " + token.value;
    }

    if (lastToken) line.push(lastToken);

    line.push(token);
    output.push(line);
  }

  $_StringLiteral(play, token) {
    const { output } = this;

    if (output.length === 0) {
      output.push([]);
    }

    const line = output.pop();
    const lastToken = line.pop();

    if (lastToken) {
      token.formattedValue = " " + token.value;
    }

    if (lastToken) {
      line.push(lastToken);
    }

    line.push(token);
    output.push(line);
  }
  // $_NoSubstitutionTemplate(play, token, output) {
  //   AddWhitespace(token, output);

  //   output.push(token);
  // }
  // $_TemplateHead(play, token, output) {
  //   AddWhitespace(token, output);

  //   output.push(token);
  // }
  // $_TemplateMiddle(play, token, output) {
  //   AddWhitespace(token, output);

  //   output.push(token);
  // }
  // $_TemplateTail(play, token, output) {
  //   AddWhitespace(token, output);

  //   output.push(token);
  // }
  // $_MultiLineComment(play, token, output) {
  //   output.push(token);
  // }
  // $_SingleLineComment(play, token, output) {
  //   output.push(token);
  // }
  // $_PrivateIdentifier(play, token, output) {
  //   AddWhitespace(token, output);

  //   output.push(token);
  // }
  // $_NumericLiteral(play, token, output) {
  //   AddWhitespace(token, output);

  //   output.push(token);
  // }
  // $_LineTerminatorSequence(play, token, output) {
  //   // skipped
  // }
  // $_Invalid(play, token, output) {
  //   output.push(token);
  // }
}

export function AddWhitespace(token, output) {
  if (!IsLastOutputIncluded(output, ["\n"])) {
    token.formattedValue = " " + token.value;
  }
}

export function AddNewLine(output) {
  output.push({ type: "LineTerminatorSequence", value: "\n" });
}

export function IsLastOutputIncluded(output, list) {
  if (output.length > 0 && list.includes(output[output.length - 1].value)) {
    return true;
  }

  return false;
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

    Q's:
        - should whitespace be removed?

        \n\n with new blocks, 
        \n with declaration
        declarations, assignments, functionscalls separated by \n\n

    notes:
      statements acquire single lines
      declarations acquire single lines

    categories:
      declaration
      function call
      assignment
      if, for

*/
