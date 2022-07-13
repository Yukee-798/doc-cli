import { Command } from 'commander';
import { today } from './utils';

export function version(program: Command) {
  return program.version(require('../package.json').version, '-v --version');
}

// TODO:对输入的参数进行 validation
export function time(program: Command) {
  return program.option(
    '-t, --time <time>',
    "the blog's created time",
    today()
  );
}
export function desc(program: Command) {
  return program.option('-d, --desc <desc>', "the blog's description", '简介');
}
// TODO:对输入的参数进行 validation
export function tags(program: Command) {
  return program.option(
    '-tg, --tags <tags>',
    "the blog's tags",
    value => value.split(','),
    []
  );
}
