#!/usr/bin/env node

import { registerCommands } from '@commands/index';
import { CLI_NAME } from '@config/constants';
import { getBanner } from '@utils/cli-utils';
import { Command } from 'commander';
import { version } from 'package.json';

const program = new Command();

console.log(getBanner());

program.name(CLI_NAME)
    .description('Seanime Tool CLI is a command-line interface for anime & manga extensions template generation.')
    .usage('[command]')
    .version(`Version: ${version}`, '-v, --version', 'display the version of the CLI')

registerCommands(program);

program.parse(process.argv);

