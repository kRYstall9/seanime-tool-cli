import figlet from 'figlet';
import chalk from 'chalk';
import { BANNER } from '@config/constants';


export const getBanner = ():string => {
    const banner:string = figlet.textSync(BANNER.toUpperCase(), {
        horizontalLayout: 'default',
        verticalLayout: 'default'
    });
      
    return chalk.cyan(banner);
}

export const getHyperLink = (logFilePath: string):string => {
    const clickablePath = `file:///${logFilePath.replace(/\\/g, '/')}`;
    const hyperlink = `\u001B]8;;${clickablePath}\u0007${logFilePath}\u001B]8;;\u0007`;

    return hyperlink;
}