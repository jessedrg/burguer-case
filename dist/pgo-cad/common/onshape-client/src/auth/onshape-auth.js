"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onShapeSign = void 0;
const util = require("../util");
const crypto = require("crypto");
const errors_1 = require("../../errors/errors");
const fs = require("fs");
const url = require("url");
const pathModule = require("path");
const querystring = require("querystring");
class onShapeSign {
    constructor(baseUrl, accesKey, secretKey) {
        this.baseUrl = baseUrl;
        this.accesKey = accesKey;
        this.secretKey = secretKey;
        this.inputHeadersFromOpts = function (opts) {
            return !('headers' in opts) ||
                typeof opts.headers !== 'object' ||
                opts.headers == null
                ? {}
                : util.copyObject(opts.headers);
        };
        this.creds = {
            baseUrl,
            accesKey,
            secretKey,
        };
        if (baseUrl.indexOf('http://') === 0) {
            this.protocol = require('http');
        }
        if (baseUrl.indexOf('https://') === 0) {
            this.protocol = require('https');
        }
        else {
            throw new Error('credentials are not valid');
        }
    }
    buildNonce() {
        const chars = [
            'A',
            'B',
            'C',
            'D',
            'E',
            'F',
            'G',
            'H',
            'I',
            'J',
            'K',
            'L',
            'M',
            'N',
            'O',
            'P',
            'Q',
            'R',
            'S',
            'T',
            'U',
            'V',
            'W',
            'X',
            'Y',
            'Z',
            '0',
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
        ];
        let nonce = '';
        for (let i = 0; i < 25; i++) {
            nonce += chars[Math.floor(Math.random() * chars.length)];
        }
        return nonce;
    }
    buildHeaders(method, path, queryString, inputHeaders) {
        const headers = util.copyObject(inputHeaders);
        const authDate = new Date().toUTCString();
        const onNonce = this.buildNonce();
        if (!('Content-Type' in headers)) {
            headers['Content-Type'] = 'application/json';
        }
        const hmacString = (method +
            '\n' +
            onNonce +
            '\n' +
            authDate +
            '\n' +
            headers['Content-Type'] +
            '\n' +
            path +
            '\n' +
            queryString +
            '\n').toLowerCase();
        const hmac = crypto.createHmac('sha256', this.creds.secretKey);
        hmac.update(hmacString);
        const signature = hmac.digest('base64');
        const asign = 'On ' + this.creds.accesKey + ':HmacSHA256:' + signature;
        headers['On-Nonce'] = onNonce;
        headers['Date'] = authDate;
        headers['Authorization'] = asign;
        if (!('Accept' in headers)) {
            headers['Accept'] = 'application/vnd.onshape.v1+json';
        }
        return headers;
    }
    buildDWMVEPath(opts) {
        let path = '/api/' + opts.resource + '/d/' + opts.d;
        if ('w' in opts) {
            path += '/w/' + opts.w;
        }
        else if ('v' in opts) {
            path += '/v/' + opts.v;
        }
        else if ('m' in opts) {
            path += '/m/' + opts.m;
        }
        if ('e' in opts) {
            path += '/e/' + opts.e;
        }
        if ('subresource' in opts) {
            path += '/' + opts.subresource;
        }
        return path;
    }
    buildQueryString(opts) {
        if (!('query' in opts) ||
            typeof opts.query !== 'object' ||
            opts.query == null) {
            return '';
        }
        return querystring.stringify(opts.query);
    }
    get(opts, cb) {
        let path = '';
        if ('path' in opts) {
            path = opts.path;
        }
        else {
            path = this.buildDWMVEPath(opts);
        }
        const baseUrl = 'baseUrl' in opts ? opts.baseUrl : this.creds.baseUrl;
        let queryString = this.buildQueryString(opts);
        const inputHeaders = this.inputHeadersFromOpts(opts);
        const headers = this.buildHeaders('GET', path, queryString, inputHeaders);
        if (queryString !== '')
            queryString = '?' + queryString;
        const requestOpts = url.parse(baseUrl + path + queryString);
        requestOpts.method = 'GET';
        requestOpts.headers = headers;
        const req = this.protocol
            .request(requestOpts, (res) => {
            let wholeData = '';
            res.on('data', (data) => {
                wholeData += data;
            });
            res.on('end', () => {
                if (res.statusCode === 200) {
                    cb(wholeData);
                }
                else if (res.statusCode === 307) {
                    const redirectParsedUrl = url.parse(res.headers.location);
                    console.log('Redirecting to ' + res.headers.location);
                    const redirectOpts = {
                        baseUrl: redirectParsedUrl.protocol + '//' + redirectParsedUrl.host,
                        path: redirectParsedUrl.pathname,
                        headers: inputHeaders,
                        query: querystring.parse(redirectParsedUrl.query),
                    };
                    this.get(redirectOpts, cb);
                }
                else {
                    console.log(requestOpts.method + ' ' + baseUrl + path + queryString);
                    console.log('Status: ' + res.statusCode);
                    if (wholeData) {
                        console.log(wholeData.toString());
                    }
                    util.error(errors_1.errors.notOKError);
                }
            });
        })
            .on('error', function (e) {
            console.log(requestOpts.method + ' ' + baseUrl + path + queryString);
            console.log(e);
            util.error(errors_1.errors.getError);
        });
        req.end();
    }
    post(opts, cb) {
        let path = '';
        if ('path' in opts) {
            path = opts.path;
        }
        else {
            path = this.buildDWMVEPath(opts);
        }
        const baseUrl = 'baseUrl' in opts ? opts.baseUrl : this.creds.baseUrl;
        const headers = this.buildHeaders('POST', path, '', this.inputHeadersFromOpts(opts));
        console.log(headers);
        const requestOpts = url.parse(baseUrl + path);
        requestOpts.method = 'POST';
        requestOpts.headers = headers;
        const req = this.protocol
            .request(requestOpts, function (res) {
            let wholeData = '';
            res.on('data', function (data) {
                wholeData += data;
            });
            res.on('end', function () {
                if (res.statusCode === 200) {
                    cb(wholeData);
                }
                else {
                    console.log(requestOpts.method + ' ' + baseUrl + path);
                    console.log(req.body);
                    console.log('Status: ' + res.statusCode);
                    if (wholeData) {
                        console.log(wholeData.toString());
                    }
                    util.error(errors_1.errors.notOKError);
                }
            });
        })
            .on('error', function (e) {
            console.log(requestOpts.method + ' ' + baseUrl + path);
            console.log(e);
            util.error(errors_1.errors.postError);
        });
        if ('body' in opts) {
            req.write(JSON.stringify(opts.body));
        }
        else {
            req.write('{}');
        }
        req.end();
    }
    delete(opts, cb) {
        let path = '';
        if ('path' in opts) {
            path = opts.path;
        }
        else {
            path = this.buildDWMVEPath(opts);
        }
        const baseUrl = 'baseUrl' in opts ? opts.baseUrl : this.creds.baseUrl;
        const headers = this.buildHeaders('DELETE', path, '', this.inputHeadersFromOpts(opts));
        const requestOpts = url.parse(baseUrl + path);
        requestOpts.method = 'DELETE';
        requestOpts.headers = headers;
        const req = this.protocol
            .request(requestOpts, function (res) {
            let wholeData = '';
            res.on('data', function (data) {
                wholeData += data;
            });
            res.on('end', function () {
                if (res.statusCode === 200) {
                    cb(wholeData);
                }
                else {
                    console.log(requestOpts.method + ' ' + baseUrl + path);
                    console.log('Status: ' + res.statusCode);
                    if (wholeData) {
                        console.log(wholeData.toString());
                    }
                    util.error(errors_1.errors.notOKError);
                }
            });
        })
            .on('error', function (e) {
            console.log(requestOpts.method + ' ' + baseUrl + path);
            console.log(e);
            util.error(errors_1.errors.deleteError);
        });
        req.end();
    }
    upload(opts, cb) {
        let path = '';
        if ('path' in opts) {
            path = opts.path;
        }
        else {
            path = this.buildDWMVEPath(opts);
        }
        const baseUrl = 'baseUrl' in opts ? opts.baseUrl : this.creds.baseUrl;
        const inputHeaders = this.inputHeadersFromOpts(opts);
        const boundaryKey = Math.random().toString(16);
        inputHeaders['Content-Type'] =
            'multipart/form-data; boundary="' + boundaryKey + '"';
        const headers = this.buildHeaders('POST', path, '', inputHeaders);
        console.log(headers);
        const requestOpts = url.parse(baseUrl + path);
        requestOpts.method = 'POST';
        requestOpts.headers = headers;
        const req = this.protocol
            .request(requestOpts, function (res) {
            let wholeData = '';
            res.on('data', function (data) {
                wholeData += data;
            });
            res.on('end', function () {
                if (res.statusCode === 200) {
                    cb(wholeData);
                }
                else {
                    console.log(requestOpts.method + ' ' + baseUrl + path);
                    console.log('Status: ' + res.statusCode);
                    if (wholeData) {
                        console.log(wholeData.toString());
                    }
                    util.error(errors_1.errors.notOKError);
                }
            });
        })
            .on('error', function (e) {
            console.log(requestOpts.method + ' ' + baseUrl + path);
            console.log(e);
            util.error(errors_1.errors.postError);
        });
        if (!('body' in opts)) {
            opts.body = {};
        }
        const filename = pathModule.basename(opts.file);
        opts.body.encodedFilename = filename;
        opts.body.fileContentLength = fs.statSync(opts.file).size;
        for (const key in opts.body) {
            req.write('--' +
                boundaryKey +
                '\r\nContent-Disposition: form-data; name="' +
                key +
                '"\r\n\r\n');
            req.write('' + opts.body[key]);
            req.write('\r\n');
        }
        req.write('--' +
            boundaryKey +
            '\r\nContent-Disposition: form-data; name="file"; filename="' +
            filename +
            '"\r\n');
        req.write('Content-Type: ' + opts.mimeType + '\r\n\r\n');
        const readStream = fs.createReadStream(opts.file);
        readStream.on('data', function (data) {
            req.write(data);
        });
        readStream.on('end', function () {
            req.write('\r\n--' + boundaryKey + '--');
            req.end();
        });
    }
}
exports.onShapeSign = onShapeSign;
//# sourceMappingURL=onshape-auth.js.map