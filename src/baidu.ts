import $ from 'jquery'
import {GM_xmlhttpRequest} from "$";


function directLink() {
    const links = [] as any[]
    const suffix = 'www.baidu.com/link'
    links.push(...$(`a[href^='http://${suffix}']`))
    links.push(...$(`a[href^='https://${suffix}']`))
    for (const e of links) {
        let url = $(e).prop('href') as string
        if (!url.startsWith(location.protocol)) {
            const segments = url.split(':', 2)
            segments[0] = location.protocol
            url = segments.join('')
        }
        GM_xmlhttpRequest({
            url: url + "&wd=&eqid=",
            timeout: 15000,
            onload: function (response) {
                const urls = response.responseText.match(/https?:\/\/[^\s'"]+/)
                if (urls instanceof Array && urls.length > 0) {
                    $(e).prop('href', urls[0])
                }
            },
        });
    }
}

function callback() {
    directLink()
}

location.host === 'www.baidu.com' ? $(callback) : false;
