/// <reference path="./anime-torrent-provider.d.ts" />
/// <reference path="./core.d.ts" />


class Provider {
    private api = "https://example.com"
		
    // Returns the provider settings.
    async getSettings(): AnimeProviderSettings {
	// TODO: Edit this
         return {
            canSmartSearch: true,
            smartSearchFilters: ["batch", "episodeNumber", "resolution"],
            supportsAdult: false,
            type: "main",
        }
    }
    // Returns the search results depending on the query.
    async search(opts: AnimeSearchOptions): Promise<AnimeTorrent[]> {
	// TODO
        return []
    }
    // Returns the search results depending on the search options.
    async smartSearch(opts: AnimeSmartSearchOptions): Promise<AnimeTorrent[]> {
	// TODO
        return []
    }
    // Scrapes the torrent page to get the info hash.
    // If already present in AnimeTorrent, this should just return the info hash without scraping.
    async getTorrentInfoHash(torrent: AnimeTorrent): Promise<string> {
        return torrent.infoHash
    }
    // Scrapes the torrent page to get the magnet link.
    // If already present in AnimeTorrent, this should just return the magnet link without scraping.
    async getTorrentMagnetLink(torrent: AnimeTorrent): Promise<string> {
        return torrent.magnetLink
    }
    // Returns the latest torrents.
    // Note that this is only used by "main" providers.
    async getLatest(): Promise<AnimeTorrent[]> {
	// TODO
        return []
    }
}