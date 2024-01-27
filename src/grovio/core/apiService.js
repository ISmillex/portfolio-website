import { Innertube, UniversalCache } from "youtubei.js";

export default class ApiService {
    constructor(settings, urlService) {
        this.settings = settings;
        this.yt = this._init();
        this.currentTrackInfo = null;
        this.urlService = urlService;
    }

    async _init() {
        // Create and configure Innertube instance
        return await Innertube.create({
            generate_session_locally: true,
            cache: new UniversalCache(false),
            fetch: this._customFetch.bind(this),
        });
    }

    async _customFetch(input, init) {
        // Customize and handle fetch requests
        const url = this._buildProxyUrl(input);
        const headers = this._buildProxyHeaders(init, input);

        // Set up the request with modified URL and headers
        const request = new Request(url, input instanceof Request ? input : undefined);

        // Fetch the modified request
        return await fetch(request, init ? { ...init, headers } : { headers });
    }

    _buildProxyUrl(input) {
        // Build a custom URL based on the input and settings
        let url;
        if (typeof input === 'string') {
            url = new URL(input);
        } else if (input instanceof URL) {
            url = input;
        } else {
            url = new URL(input.url);
        }

        url.searchParams.set('__host', url.host);
        url.searchParams.set('__path', url.pathname);
        url.protocol = 'http';
        url.host = this.settings.server.host;
        url.port = this.settings.server.port;
        url.pathname = this.settings.server.path;

        // Serialize headers in the URL
        const headers = input instanceof Request ? input.headers : new Headers();
        url.searchParams.set('__headers', JSON.stringify([...headers]));

        if (input instanceof Request) {
            // @ts-ignore
            input.duplex = 'half';
        }

        return url;
    }

    _buildProxyHeaders(init, input) {
        // Build custom headers based on the initial headers
        let headers;
        if (init?.headers) {
            headers = new Headers(init.headers);
        } else if (input instanceof Request) {
            headers = input.headers;
        } else {
            headers = new Headers();
        }

        // Remove user-agent header
        headers.delete('user-agent');

        return headers;
    }

    async getTrackInfo(url) {
        const yt = await this.yt;
        const songId = this.urlService.convertYTurlToId(url, "track");
        if (!songId) return null;

        const info = await yt.getInfo(songId, "ANDROID"); // using getInfo for track info because can download only from yt.getInfo
        this.currentTrackInfo = await yt.music.getInfo(songId); // using music interface for track info because it is more reliable for track info
        // console.log({"yt": info});
        console.log({"yt-music": this.currentTrackInfo})
        return  {
            streaming_data: info.streaming_data,
            basic_info: this.currentTrackInfo.basic_info
        }
    }


    async getAlbumInfo(url) {
        console.log(url)
        const yt = await this.yt;
        const albumId = this.urlService.convertYTurlToId(url, "album");
        console.log(albumId)
        if (!albumId) return null;

        const info = await yt.music.getPlaylist(albumId);

        return info;
    }


    async getArtistInfo(url) {
        console.log(url)
        const yt = await this.yt;
        const artistId = this.urlService.convertYTurlToId(url, "artist");
        if (!artistId) return null;
        console.log(artistId)
        const info = await yt.music.getArtist(artistId);

        return info;

    }


    async createBlob(audiodUrl) {
        // Download a blob using the proxy
        const response = await this._requestBlobProxy(audiodUrl);
        return await response.blob();
    }

    async _requestBlobProxy(url) {
        // Create a local URL for proxying blobs
        const localUrl = new URL(`http://${this.settings.server.host}:${this.settings.server.port}${this.settings.server.path}`);

        localUrl.searchParams.set('__blob', url);
        localUrl.protocol = 'http';
        localUrl.host = this.settings.server.host;
        localUrl.port = this.settings.server.port;
        localUrl.pathname = this.settings.server.path;

        return await fetch(localUrl);
    }

    async getAudioUrl(streaming_data) {
        const yt = await this.yt;

        // Extract audio formats from videoInfo
        const audioFormats = streaming_data.adaptive_formats.filter(
            format => format.has_audio && !format.has_video
        );


        const selectedAudioFormat = await this._getClosestAudioFormat(audioFormats);

        if (!selectedAudioFormat) {
            return { error: 'No suitable audio format found' };
        }

        const filename = await this._buildFilename(selectedAudioFormat);


        const downloadUrl = selectedAudioFormat.decipher(yt.session.player);

        return {
            audioUrl: downloadUrl,
            filename: filename,
        };
    }

    async _getClosestAudioFormat(audioFormats) {
        const targetBitrate = this.settings.audio.bitrate;
        const specifiedFormat = this.settings.audio.format;

        const codecs = {
            "mp4a.40.2": ".m4a",
            "mp4a.40.5": ".m4a",
            "opus": ".opus",
        }
        // Filter audio formats with the specified format
        const specifiedFormats = audioFormats.filter(format => {
            const codec = format.mime_type.split(";")[1].split("=")[1].replace(/"/g, "");
            return codecs[codec] === specifiedFormat;
        });

        // If there are specified formats, choose the one with the highest bitrate
        if (specifiedFormats.length > 0) {
            specifiedFormats.sort((a, b) => b.bitrate - a.bitrate);
            return specifiedFormats[0];
        }

        // Sort audio formats by bitrate in ascending order
        audioFormats.sort((a, b) => a.bitrate - b.bitrate);

        // Find the closest audio format
        const chosenAudioFormat = audioFormats.reduce((closest, format) => {
            if (!closest || Math.abs(format.bitrate - targetBitrate) < Math.abs(closest.bitrate - targetBitrate)) {
                return format;
            }
            return closest;
        }, null);

        // If no suitable audio format is found, return an error or handle it as needed
        if (!chosenAudioFormat) {
            return { error: 'No suitable audio format found' };
        }

        return chosenAudioFormat;
    }


    async _buildFilename(selectedAudioFormat) {
        const trackInfo = await this.currentTrackInfo;

        const codecs = {
            "mp4a.40.2": ".m4a",
            "mp4a.40.5": ".m4a",
            "opus": ".opus",
        }

        const codec= selectedAudioFormat.mime_type.split(";")[1].split("=")[1].replace(/"/g, "");

        const duration = trackInfo.basic_info.duration;
        const minutes = Math.floor(duration / 60);
        const seconds = duration - minutes * 60;
        const formattedDuration = `{${minutes}m-${seconds}s}`;

        return this.settings.audio.filename
            .replace('{artist}', trackInfo.basic_info.author)
            .replace('{title}', trackInfo.basic_info.title)
                .replace('{duration}', formattedDuration)
            + (codecs[codec] || '.mp3');
    }

}
