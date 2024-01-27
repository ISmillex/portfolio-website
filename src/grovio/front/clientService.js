
export default class ClientService {
    constructor(apiService, urlService) {
        this.api = apiService;
        this.urlHandler = urlService;
    }

    async search() {

    }

    downloadBlob(blob, title) {
        const blob_url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blob_url;
        link.download = title;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    async download(streaming_data) {
        const {audioUrl, filename} = await this.api.getAudioUrl(streaming_data);
        const blob = await this.api.createBlob(audioUrl);
        this.downloadBlob(blob, filename);
    }


    getUrlHandler() {
        return this.urlHandler;
    }


    async stream() {

    }


    async getTrackInfo(url) {
        const {type, yt_url} = await this.urlHandler.convertToYTMusic(url);

        console.log({type, yt_url})

        if (type !== "track") return null;

        const {streaming_data, basic_info} = await this.api.getTrackInfo(yt_url);
        const lyrics = await this.getLyrics(yt_url);

        return {
            trackInfo: {
                title: basic_info.title,
                artist: basic_info.author,
                description: basic_info.description,
                duration: basic_info.duration,
                thumbnails: basic_info.thumbnail,
                ytLink: basic_info.url_canonical
            },
            lyrics: lyrics,
            streaming_data: streaming_data
        }
    }

    async getAlbumInfo(url) {
        const {type, yt_url} = await this.urlHandler.convertToYTMusic(url);

        if (type !== "album") return null;

        return await this.api.getAlbumInfo(yt_url);
    }

    async getArtistInfo(url) {
        const {type, yt_url} = await this.urlHandler.convertToYTMusic(url);


        if (type !== "artist") return null;

        return await this.api.getArtistInfo(yt_url);
    }

    async getLyrics() {

    }


    async getPlaylist() {

    }

    async getMetadata() {

    }

    async getQueue() {

    }

    async setQueue() {

    }

    async getSettings() {

    }

    async setSettings() {

    }


}