/// <reference path="./manga-provider.d.ts" />
/// <reference path="./core.d.ts" />
 
class Provider {
    private api = "https://example.com"
		
    getSettings(): Settings {
        return {
            supportsMultiLanguage: false,
            supportsMultiScanlator: false,
        }
    }

    // Returns the search results based on the query.
    async search(opts: QueryOptions): Promise<SearchResult[]> {
	// TODO
        return [{
            id: "999",
            title: "Manga Title",
            synonyms: ["Synonym 1", "Synonym 2"],
            year: 2021,
            image: "https://example.com/image.jpg",
        }]
    }
    
    // Returns the chapters based on the manga ID.
    // The chapters should be sorted in ascending order (0, 1, ...).
    async findChapters(mangaId: string): Promise<ChapterDetails[]> {
	// TODO
        return [{
            id: `999-chapter-1`,
            url: "https://example.com/manga/999-chapter-1",
            title: "Chapter 1",
            chapter: "1",
            index: 0,
        }]
    }
    
    // Returns the chapter pages based on the chapter ID.
    // The pages should be sorted in ascending order (0, 1, ...).
    async findChapterPages(chapterId: string): Promise<ChapterPage[]> {
	// TODO
        return [{
            url: "https://example.com/manga/999-chapter-1/page-1.jpg",
            index: 0,
            headers: {
                "Referer": "https://example.com/manga/999/chapter-1",
            },
        }]
    }
}