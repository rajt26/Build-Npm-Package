"use strict";
const _ = require('lodash');
const moment = require("moment");
var Decimal = require("decimal.js");
const request = require("request");
module.exports = {

    /**
     * @description generate slug from string
     * @param text
     * @return {string}
     */
    slugify: (text) => {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
            .replace(/\-\-+/g, '-')         // Replace multiple - with single -
            .replace(/^-+/, '')             // Trim - from start of text
            .replace(/-+$/, '');
    },
    randomString(strLength) {
        let chars = "ABCDEFGHIJKLMNOPQRSTUVWXTZ123456abcdefghiklmnopqrstuvwxyz";
        let string_length = strLength || 8;
        let randomstring = '';
        let charCount = 0;
        let numCount = 0;

        for (let i = 0; i < string_length; i++) {
            // If random bit is 0, there are less than 3 digits already saved, and there are not already 5 characters saved, generate a numeric value.
            if ((Math.floor(Math.random() * 2) == 0) && numCount < 3 || charCount >= 5) {
                let rnum = Math.floor(Math.random() * 10);
                randomstring += rnum;
                numCount += 1;
            } else {
                // If any of the above criteria fail, go ahead and generate an alpha character from the chars string
                let rnum = Math.floor(Math.random() * chars.length);
                randomstring += chars.substring(rnum, rnum + 1);
                charCount += 1;
            }
        }
        return randomstring
    },


    /**
     * @description: humanize string into readable format
     * @param str
     */
    humanize: (str) => {
        return str
            .replace(/^[\s_]+|[\s_]+$/g, '')
            .replace(/[_\s]+/g, ' ')
            .replace(/^[a-z]/, function (m) {
                return m.toUpperCase();
            });
    },
    /**
     * @description getting base URL of project
     * @return {string}
     */
    getBaseUrl: () => {
        if (sails.config.custom && sails.config.custom.baseUrl) {
            return sails.config.custom.baseUrl;
        }
        var usingSSL = sails.config.ssl && sails.config.ssl.key && sails.config.ssl.cert;
        var port = sails.config.proxyPort || sails.config.port;
        let domain = "";
        let interfaces = require('os').networkInterfaces();
        for (let devName in interfaces) {
            let iface = interfaces[devName];
            for (let i = 0; i < iface.length; i++) {
                let alias = iface[i];
                if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                    domain = alias.address;
                }
            }
        }
        var localAppURL =
            (usingSSL ? 'https' : 'http') + '://' +
            (domain) +
            (port == 80 || port == 443 ? '' : ':' + port);

        return localAppURL;
    },
    randomNumber: (length = 6) => {
        let numbers = '01234567890123456789';
        let result = '';
        for (let i = length; i > 0; --i) {
            result += numbers[Math.round(Math.random() * (numbers.length - 1))];
        }
        return result;
    },
    getPrimaryEmail(emails) {
        if (emails && _.size(emails) > 0) {
            let email = _.find(emails, function (email) {
                return email.isPrimary;
            })
            return email && email.email ? email.email : '';
        }
        return '';
    },

    getIPFromReq(req) {
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        return ip.replace('::ffff:', '')
    },

    async getClientIpInfo(ip) {
        ip = ip.replace('::ffff:', '');
        return new Promise((resolve, reject) => {
            var ipapi = require('ipapi.co');
            ipapi.location(function (res) {
                resolve({
                    ip: ip,
                    address: {
                        country: res && res.country_name ? res.country_name : "",
                        region: res && res.region ? res.region : "",
                        city: res && res.city ? res.city : "",
                        postalCode: res && res.postal ? res.postal : "",
                        latitude: res && res.latitude ? res.latitude : "",
                        longitude: res && res.longitude ? res.longitude : "",
                        timezone: res && res.timezone ? res.timezone : "",

                    },
                    time: moment().toISOString()
                })
            }, ip)
        });
    },
    doubleDateToString(doubleDate) {
        return doubleDate ? moment(doubleDate * 1000 * 60 * 60 * 24).format("MM/DD/YYYY") : ""
    },
    doubleDateToISO(doubleDate) {
        return doubleDate ? moment(doubleDate * 1000 * 60 * 60 * 24).toISOString() : "";
    },
    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },

    /**
     * Generate Excel Row Letter by Number Specified
     * @param num
     * @returns {string}
     */
    getNameFromNumber: function (num) {
        var numeric = num % 26;
        var letter = String.fromCharCode(65 + numeric);
        var num2 = parseInt(num / 26);
        if (num2 > 0) {
            return this.getNameFromNumber(num2 - 1) + letter;
        } else {
            return letter;
        }
    },
    camelize: function (str) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    },
    rounding(num, decimal = 2) {
        return Math.ceil(num * Math.pow(10, decimal)) / Math.pow(10, decimal)
        //return num
    },
    decimalMul(arr) {
        let res = new Decimal(1);
        _.each(arr, (a) => {
            res = res.mul(new Decimal(a))
        })
        return res.toString()
    },
    roundingUp(num, decimal = 2) {
        // console.log(num)
        //num = new Decimal(num);
        //return num.toFixed(2).toString();
        return Math.round(UtilService.decimalMul([num, Math.pow(10, decimal)])) / Math.pow(10, decimal)
        //return num
    },
    discountRound(a = "") {
        a = a.toString().split(".")
        return parseFloat(a[0] + "." + (a[1] ? (a[1][0] || "0") + (a[1][1] || "0") : "00"))
    },
    dateFormating(date, offset = 330, format = "DD-MM-YYYY hh:mm A") {
        return moment.utc(date).utcOffset(offset).format(format)
    },
    async execSqlQuery(query) {
        try {
            // let url = sails.config.diamondSyncUrl + "/admin/hk/sql/query"
            // console.log(url)
            // return await new Promise((resolve, reject) => {
            //     let uri = {
            //         url: url, //URL to hit
            //         method: "POST",
            //         json: { query: query } //Set the body as a string
            //     };
            //     request(uri,
            //         // return data
            //         (err, response, body) => {
            //             console.log(err, body)
            //             if (err) {
            //                 reject(err);
            //             }
            //             else if (body) {
            //                 resolve(body);
            //             }
            //             else {
            //                 resolve([]);
            //             }
            //         });
            // });
            return true;
        } catch (e) {
            throw e
        }

    },
    getDeviceType(options = {}) {
        var deviceType = "website"
        switch (options.deviceType) {
            case sails.config.DEVICE_TYPE.ANDROID.toString():
                deviceType = "App"
                break;
            case sails.config.DEVICE_TYPE.IPHONE.toString():
                deviceType = "App"
                break;
        }
        return deviceType
    }
};
