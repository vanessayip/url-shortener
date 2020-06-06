const validIdCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const domain = 'http://localhost:8080';
const longUrlToShort = {};
const shortUrlToLongUrl = {};
const stats = {};
/* schema for stats object
key = bitlink
value = {
    longUrl <string>,
    shortUrl <string>,
    visitCount <number>,
    createdAt <date>
    visitLog {
        date: count <number>
    }
}
*/

const generateId = () => {
    const idLength = 7;
    let id = '';
    for (let i = 0; i < idLength; i++) {
        id += validIdCharacters.charAt(Math.floor(Math.random() * idLength));
    }
    return id;
}

const isValidId = (id) => {
    // TODO
    return true;
}

const createShortUrl = (longUrl = '', customShortId = '') => {
    console.log('longUrl', longUrl);
    // check validness of customshortId
    if (!isValidId(customShortId)) {
        return new Error({ message: 'custom short id contains invalid characters'})
    }
    let shortUrl = longUrlToShort[longUrl];
    let id = shortUrl ? shortUrl.replace(`${domain}/`, '') : '';
    console.log('id outside while', id)
    if (!id) {
        let isUnique = false;
        while (!isUnique) {
            id = customShortId || generateId();
            let shortUrl = `${domain}/${id}`;
            const existingValue = shortUrlToLongUrl[shortUrl];
            console.log('exisitingValue', existingValue)
            if (!existingValue) {
                longUrlToShort[longUrl] = shortUrl;
                shortUrlToLongUrl[shortUrl] = longUrl;
                stats[id] = {
                    longUrl,
                    shortUrl,
                    createdAt: new Date(),
                    visitCount: 0,
                    visitLog: {},
                }
                isUnique = true;
            }
            if (!isUnique && customShortId) {
                // TODO
                return new Error()
            }
        }
    }
    console.log(stats)
    // in a solution with a datastore, return the entire record
    return stats[id];
}

module.exports = {
    createShortUrl,
};