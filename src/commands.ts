import { Command } from 'commander';

export function init(program: Command) {
  return program.command('init <title>');
}
