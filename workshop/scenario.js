import jsTokens from "js-tokens";
import Scenario from "scenarist.dev";
import punctuator from "./punctuator.js";

const left = {
  "]": "[",
  ")": "(",
  "}": "{",
};

const declarationKeyWords = ['var', 'let', 'const']
const assignmentOperators = [
  '=', '+=', '-=', '*=', '/=', '%=', '**=', '<<=', '>>=', '>>>=', '&=', '^=', '|=', '&&=', '||=', '??='
]

export default class Formatter {
  output = [];
  $_director(play, line) {
    const  formatter  = this;
    const { output } = formatter;

    if (typeof line === "symbol" || line.trim() == '') {
      return output
      .map((line) =>
        line.map((token) => token.formattedValue || token.value).join("")
      ).join('\n');
    }

    const tokens = jsTokens(line.trim());
    
    output.push([])
    for (const token of tokens) {
      if (token.done) break;
      play(Symbol.for(token.type), token, output);
    }
    this.processNewLine(output)

    return output
      .map((line) =>
        line.map((token) => token.formattedValue || token.value).join("")
      ).join('\n');
  }

  $_IdentifierName(play, token) {
    const { output } = this;

    // if (output.length === 0) {
    //   output.push([]);
    // }

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
      output.push(line);
      return
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
  $_NoSubstitutionTemplate(play, token) {
    const { output } = this;

    if (output.length === 0) {
      output.push([]);
    }

    const line = output.pop();
    line.push(token);
    output.push(line);

    token.formattedValue = " " + token.value;
  }
  $_TemplateHead(play, token) {
    const { output } = this;

    if (output.length === 0) {
      output.push([]);
    }

    const line = output.pop();
    line.push(token);
    output.push(line);

    token.formattedValue = " " + token.value;
  }
  $_TemplateMiddle(play, token) {
    const { output } = this;

    if (output.length === 0) {
      output.push([]);
    }

    const line = output.pop();
    line.push(token);
    output.push(line);

    token.formattedValue = " " + token.value;
  }
  $_TemplateTail(play, token) {
    const { output } = this;

    if (output.length === 0) {
      output.push([]);
    }

    const line = output.pop();
    line.push(token);
    output.push(line);

    token.formattedValue = " " + token.value;
  }
  $_MultiLineComment(play, token) {
    const { output } = this;

    if (output.length === 0) {
      output.push([]);
    }

    const line = output.pop();
    line.push(token);
    output.push(line);
  }
  $_SingleLineComment(play, token) {
    const { output } = this;

    if (output.length === 0) {
      output.push([]);
    }

    const line = output.pop();
    line.push(token);
    output.push(line);
  }
  $_PrivateIdentifier(play, token) {
    const { output } = this;

    if (output.length === 0) {
      output.push([]);
    }

    const line = output.pop();
    line.push(token);
    output.push(line);

    token.formattedValue = " " + token.value;
  }
  $_NumericLiteral(play, token) {
    const { output } = this;

    if (output.length === 0) {
      output.push([]);
    }

    const line = output.pop();
    line.push(token);
    output.push(line);

    token.formattedValue = " " + token.value;
  }
  // $_LineTerminatorSequence(play, token) {
  //   const { output } = this;

  //   if (output.length === 0) {
  //     output.push([]);
  //   }

  //   const line = output.pop();
  //   line.push(token);
  //   output.push(line);
  // }
  $_Invalid(play, token) {
    const { output } = this;

    if (output.length === 0) {
      output.push([]);
    }

    const line = output.pop();
    line.push(token);
    output.push(line);

    token.formattedValue = " " + token.value;
  }

  processNewLine(output){
    const lastLine = output.pop()
    if(output.length == 0){
      output.push(lastLine)
      return
    }

    const nextToLastLine = output.pop()

    if(
      this.isBlockOpenning(nextToLastLine) ||
      this.isBlockClosing(lastLine) ||
      this.isBlockClosed(nextToLastLine) || 
      this.haveAssignmentsEnded(nextToLastLine, lastLine) ||
      this.haveDeclarationsEnded(nextToLastLine, lastLine) ||
      this.haveFunctionCallsEnded(nextToLastLine, lastLine)
    ){
      nextToLastLine.push({ type: "LineTerminatorSequence", value: "\n" })
      output.push(nextToLastLine)
      output.push(lastLine); 
      return
    }

    output.push(nextToLastLine)
    output.push(lastLine)
  }

  isBlockClosed(nextToLastLine){
    return nextToLastLine.length > 0 && nextToLastLine[0].value == '}'
  }

  isLastLineNewLine(nextToLastLine){
    return nextToLastLine.length > 0 && nextToLastLine[0].type == 'LineTerminatorSequence'
  }

  isBlockOpenning(nextToLastLine){
    const len = nextToLastLine.length
    return len > 0 && nextToLastLine[len-1].value === '{'
  }

  isBlockClosing(lastLine){
    return lastLine.length > 0 && lastLine[0].value == '}'
  }

  haveDeclarationsEnded(nextToLastLine, lastLine){
    return nextToLastLine.length > 0  && lastLine.length > 0 && declarationKeyWords.includes(nextToLastLine[0].value) && !declarationKeyWords.includes(lastLine[0].value)
  }

  haveAssignmentsEnded(nextToLastLine, lastLine){
    return nextToLastLine.length > 1 && assignmentOperators.includes(nextToLastLine[1].value) && (lastLine.length < 2 ||  !assignmentOperators.includes(lastLine[1].value))
  }

  haveFunctionCallsEnded(nextToLastLine, lastLine){
    return nextToLastLine.length > 1 && nextToLastLine[1].value == '(' && (lastLine.length < 2 ||  lastLine[1].value != '(')
  }
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
