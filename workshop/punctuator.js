import jsTokens from "js-tokens";
import { AddNewLine, AddWhitespace, IsLastOutputIncluded } from "./scenario.js";

const Punctuators = {
  // "+": "Operator",
  // "-": "Operator",
  // "+": "Operator",
  // "*": "Operator",
  // "=": "Operator",
  // "==": "Operator",
  // "+=": "Operator",
  // "-=": "Operator",
  // "*=": "Operator",
  // "/=": "Operator",
  // "|=": "Operator",
  // "^=": "Operator",
  // "%=": "Operator",
  // "&=": "Operator",
  // "||=": "Operator",
  // "&&=": "Operator",
  // "!==": "Operator",
  // "<<=": "Operator",
  // ">>=": "Operator",
  // "===": "Operator",

  "{": "OpeningCurlyBrace",
  "[": "OpeningSquareBracked",
  "(": "OpeningParanthesis",

  ")": "ClosingParenthesis",
  "}": "ClosingCurlyBrace",
  "]": "ClosingSquareBracket",
  ":": "Colon",
  ";": "SemiColon",
  ",": "Comma",
};

const SpecialPunctuators = ["{", "}", "[", "]", "(", ")", ":", ";", ","];

export default {
  $_director(play, token, output) {
    console.log("punc direct");
    console.log(token);
    if (!SpecialPunctuators.includes(token.value)) {
      AddWhitespace(token, output);
      output.push(token);
      return;
    }

    const type = Punctuators[token.value];
    play(type, token, output);
  },

  $Operator(play, token, output) {
    AddWhitespace(token, output);
    output.push(token);
  },

  $OpeningCurlyBrace(play, token, output) {
    AddWhitespace(token, output);

    if (!IsLastOutputIncluded(output, ["let", "const"])) {
      token.formattedValue += "\n";
    }

    output.push(token);
  },

  $OpeningSquareBracked(play, token, output) {
    AddWhitespace(token, output);
    output.push(token);
  },

  $OpeningParenthesis(play, token, output) {
    AddWhitespace(token, output);
    output.push(token);
  },

  $ClosingParentheses(play, token, output) {
    if (!IsLastOutputIncluded(output, ["("])) {
      AddWhitespace(token, output);
    }

    output.push(token);
  },

  $ClosingCurlyBrace(play, token, output) {
    if (!IsLastOutputIncluded(output, ["{"])) {
      AddWhitespace(token, output);
    }

    output.push(token);
  },

  $ClosingParentheses(play, token, output) {
    if (!IsLastOutputIncluded(output, ["["])) {
      AddWhitespace(token, output);
    }

    output.push(token);
  },

  $Colon(play, token, output) {
    if (
      output.length > 0 &&
      output[output.length - 1].type !== "IdentifierName"
    ) {
      AddWhitespace(token, output);
    }

    output.push(token);
  },

  $Comma(play, token, output) {
    output.push(token);
  },

  $SemiColon(play, token, output) {
    output.push(token);
    AddNewLine(output);
  },
};
