import path from 'path';
import os from 'os';


export const LOG_DIR = path.join(os.tmpdir(), 'seanime-tool-cli', 'logs');
export const CLI_NAME = 'seanime-tool';
export const BANNER = 'seanime tool cli';

export const EXTENSION_TYPES: {name:string, value:string}[] = [
    {name: "Online Streaming Provider", value: "anime-streaming"},
    {name: "Manga provider", value: "manga"},
    {name: "Anime Torrent Provider", value: "anime-torrent"},
    {name: "Plugin", value: "plugin"}
];

export const TEMPLATES:Record<string,string[]> = {
    "anime-streaming": [
        'https://github.com/5rahim/seanime/blob/main/internal/extension_repo/goja_onlinestream_test/onlinestream-provider.d.ts',
        'https://github.com/5rahim/seanime/blob/c05fa0b1c76d8a45b07ef287009f72c7fb58a89d/internal/extension_repo/goja_plugin_types/core.d.ts'
    ],
    "manga": [
        'https://github.com/5rahim/seanime/blob/c05fa0b1c76d8a45b07ef287009f72c7fb58a89d/internal/extension_repo/goja_manga_test/manga-provider.d.ts',
        'https://github.com/5rahim/seanime/blob/c05fa0b1c76d8a45b07ef287009f72c7fb58a89d/internal/extension_repo/goja_plugin_types/core.d.ts'
    ],
    "anime-torrent": [
        'https://github.com/5rahim/seanime/blob/c05fa0b1c76d8a45b07ef287009f72c7fb58a89d/internal/extension_repo/goja_torrent_test/anime-torrent-provider.d.ts',
        'https://github.com/5rahim/seanime/blob/c05fa0b1c76d8a45b07ef287009f72c7fb58a89d/internal/extension_repo/goja_plugin_types/core.d.ts'
    ],
    "plugin":[
        'https://github.com/5rahim/seanime/blob/c05fa0b1c76d8a45b07ef287009f72c7fb58a89d/internal/extension_repo/goja_plugin_types/app.d.ts',
        'https://github.com/5rahim/seanime/blob/c05fa0b1c76d8a45b07ef287009f72c7fb58a89d/internal/extension_repo/goja_plugin_types/plugin.d.ts',
        'https://github.com/5rahim/seanime/blob/c05fa0b1c76d8a45b07ef287009f72c7fb58a89d/internal/extension_repo/goja_plugin_types/system.d.ts'
    ]
};