/**
 * Created by elle on 11/3/14.
 */

/* jshint globalstrict: true */

'use strict';

function parse(expr) {
  var lexer = new Lexer(),
      parser = new Parser(lexer);

  return parser.parse(expr);
}


/**
 *The lexer takes the original expression string and returns
 * a collection of tokens parsed from that string.
 */

function Lexer() {

}

Lexer.prototype.lex = function lex(text) {
  this.text = text || '';
  this.index = 0;
  this.ch = undefined;
  this.tokens = [];

  while (this.index < this.text.length) {
    this.ch = this.text.charAt(this.index);
    if (this.isNumber(this.ch)) {
      this.readNumber();
    } else {
      throw 'Unexpected next character:' + this.ch;
    }
  }

  return this.tokens;
};

Lexer.prototype.isNumber = function isNumber(ch) {
  return '0' <= ch && ch <= '9';
};

Lexer.prototype.readNumber = function readNumber () {
  var ch, number = '';

  while (this.index < this.text.length) {
    ch = this.text.charAt(this.index);
    if (this.isNumber(ch)) {
      number += ch;
    } else {
      break;
    }
    this.index++;
  }

  number = +number;
  this.tokens.push({
    text: number,
    fn: _.constant(number),
    constant: true
  });
};

/**
 * The parser takes the token collection produced by
 * the lexer and returns a function that evaluates the expression in a given context.
 */

function Parser(lexer) {
  this.lexer = lexer;
}

Parser.prototype.parse = function parse(text) {
  this.tokens = this.lexer.lex(text);
  return this.primary();
};

Parser.prototype.primary = function primary() {
  var token = this.tokens[0],
      primary = token.fn;

  if (token.constant) {
    primary.constant = true;
    primary.literal = true;
  }

  return primary;
};