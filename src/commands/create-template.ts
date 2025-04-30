import { Command } from "commander";
import inquirer from "inquirer";
import fs from 'fs-extra';
import { logger } from '@utils/logger';
import { EXTENSION_TYPES } from "@config/constants";
import { getExtensionFiles } from "@utils/template";


const command = new Command('g-template')
  .description('Creates a folder containing all the necessary files to develop the chosen extension')
  .action(async () => {

    try {
      const { template: extensionType } = await inquirer.prompt([
        {
          name: 'template',
          type: 'list',
          message: 'Choose an extension type:',
          choices: EXTENSION_TYPES
        },
      ]);

      const { extensionName: extensionName } = await inquirer.prompt([
        {
          name: 'extensionName',
          type: 'input',
          message: 'Insert the extension name:',
          required: true
        }
      ])

      const { authorName: authorName } = await inquirer.prompt([
        {
          name: 'authorName',
          type: 'input',
          message: 'Insert extension\'s author name:',
          required: true
        }
      ]);

      if (fs.pathExistsSync(extensionName)) {
        logger.error(`A folder named ${extensionName} already exists`);
        process.exit(1);
      }

      await fs.ensureDir(extensionName);

      await getExtensionFiles(extensionType, extensionName, authorName);

      logger.info(`Extension templates created`);

    }
    catch (error: any) {
      if (error.name === 'ExitPromptError') {
        process.exit(0);
      }

      logger.error(error);
    }
  })
  .helpOption(false);

export default command;
