
export default class UrlService {

    constructor(settings) {
        this.settings = settings;
        this.PATTERNS = {
            "youtube": /^(https?:\/\/)?((www\.)?youtube\.com|music\.youtube\.com|youtu\.?be)\/.+$/,
            "spotify": /^(https?:\/\/)?(www\.)?(open\.spotify\.com)\/.+$/,
            "soundcloud": /^(https?:\/\/)?((www\.)?soundcloud\.com)\/.+$/,
            "deezer": /^(https?:\/\/)?((www\.)?deezer\.com)\/.+$/,
            "apple": /^(https?:\/\/)?((www\.)?music\.apple\.com)\/.+$/,
            "tidal": /^(https?:\/\/)?((www\.)?tidal\.com)\/.+$/,
            "amazon": /^(https?:\/\/)?((www\.)?music\.amazon\.com)\/.+$/,
            "audioMack": /^(https?:\/\/)?((www\.)?audiomack\.com)\/.+$/,
            "qobuz": /^(https?:\/\/)?((www\.)?qobuz\.com)\/.+$/,
        }
        this.API_URL = "https://api.songwhip.com/v3/create"
    }

    isValid(url) {
        for (const pattern in this.PATTERNS) {
            if (this.PATTERNS[pattern].test(url)) {
                return true;
            }
        }
        return false;
    }

    isYouTubeLink(url) {
        return this.PATTERNS.youtube.test(url);
    }

    async convertToYTMusic(url) {
        let type = '';
        let yt_url = url;

        if (!this.isYouTubeLink(url)) {
            let links = await this.getLinks(url);
            yt_url = links.youtubeMusic[0].link || links.youtube[0].link;
        }

        const url_obj = new URL(yt_url);

        if (url_obj.pathname.includes('channel')) {
            type = 'artist';
        } else if (url_obj.pathname.includes('playlist')) {
            type = 'album';
        } else if (url_obj.pathname.includes('watch')) {
            type = 'track';
        }

        return {type: type, yt_url: yt_url};
    }


    convertYTurlToId(url, type) {
        if(this.isYouTubeLink(url)) {
            const url_obj = new URL(url);
            if (type === 'artist') {
                return this._parseArtistId(url_obj);
            } else if (type === 'album') {
                return this._parseAlbumId(url_obj);
            } else if (type === 'track') {
                return this._parseTrackId(url_obj);
            }
        }
        return null;
    }


    _parseTrackId(url) {
        if (url.host.includes('music')) {
            let id = url.searchParams.get('v');
            return id.split('&')[0];
        } else {
            return url.searchParams.get('v');
        }
    }

    _parseArtistId(url) {
        if (url.host.includes('music')) {
            const id = url.pathname.split('/');
            return id[id.length - 1];
        } else {
            return null
        }
    }

    _parseAlbumId(url) {
        if (url.host.includes('music')) {
            const id = url.searchParams.get('list');
            return id.split('&')[0];
        } else {
            return null
        }
    }

     _buildProxyHeaders() {
        return {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Host': 'api.songwhip.com',
            'Origin': 'https://songwhip.com',
        };
    }

     _buildProxyUrl(settings, API_URL, headers) {
        const localUrl = new URL(`http://${settings.server.host}:${settings.server.port}${settings.server.path}`);
        localUrl.searchParams.set('__convertUrl', API_URL);
        localUrl.searchParams.set('__headers', JSON.stringify(headers));
        localUrl.protocol = 'http';
        localUrl.host = settings.server.host;
        localUrl.port = settings.server.port;
        localUrl.pathname = settings.server.path;

        return localUrl;
    }

     _buildProxyPayload(url) {
        return {
            "url": url,
            "country": "US",
        };
    }

    async  _customFetch(localUrl, payload) {
        return await fetch(localUrl, {
            method: 'POST',
            body: JSON.stringify(payload),
        });
    }

    async getLinks(url) {
        if (this.isValid(url)) {
            const headers = this._buildProxyHeaders();
            const localUrl = this._buildProxyUrl(this.settings, this.API_URL, headers);
            const payload = this._buildProxyPayload(url);
            const res = await this._customFetch(localUrl, payload);
            const body = await res.json();

            return body.data.item.links;
        }
        return {};
    }

}