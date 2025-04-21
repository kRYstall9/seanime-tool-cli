import { Command } from 'commander';
import createTemplateCommand from './create-template';

export function registerCommands(program: Command) {
  program.addCommand(createTemplateCommand);
}
