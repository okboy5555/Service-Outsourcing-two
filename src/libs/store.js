export default class RouterStore {
    constructor () {
        this.data = {},
        this.changeList = []
    }

    setItem(url, data) {
        this.changeList.forEach((fn) => fn(data, this.data[url], url));
        this.data[url] = data;
    }

    getItem (url) {
        if (url) {
            return this.data[url]
        } else {
            return this.data
        }
    }

    change (fn) {
        this.changeList.push(fn)
    }

    getUrl ({ path, query }) {
        var res = [];
        Object.keys(query).forEach((i) => res.push(`${i}=${query[i]}`));
        return [path, res.join('&')].join('?')
    }
}