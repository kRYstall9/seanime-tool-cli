/// <reference path="./onlinestream-provider.d.ts" />
/// <reference path="./core.d.ts" />
 
class Provider {

    getSettings(): Settings {
        return {
            episodeServers: ["server1", "server2"],
            supportsDub: true,
        }
    }

    async search(query: SearchOptions): Promise<SearchResult[]> {
        return [{
            id: "1",
            title: "Anime Title",
            url: "https://example.com/anime/1",
            subOrDub: "both",
        }]
    }
    async findEpisodes(id: string): Promise<EpisodeDetails[]> {
        return [{
            id: "1",
            number: 1,
            url: "https://example.com/episode/1",
            title: "Episode title",
        }]
    }
    async findEpisodeServer(episode: EpisodeDetails, _server: string): Promise<EpisodeServer> {
        let server = "server1"
        if (_server !== "default") server = _server
        
        return {
            server: server,
            headers: {},
            videoSources: [{
                url: "https://example.com/.../stream.m3u8",
                type: "m3u8",
                quality: "1080p",
                subtitles: [{
                    id: "1",
                    url: "https://example.com/.../subs.vtt",
                    language: "en",
                    isDefault: true,
                }],
            }],
        }
    }
}