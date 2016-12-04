"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const httpoptions_1 = require('./httpoptions');
const querystring_1 = require('./querystring');
const request = require('web-request');
class Giantbomb {
    constructor(apikey) {
        this.apikey = apikey;
        let qs = new querystring_1.QueryStringBuilder().addQueryStringParameter('api_key', this.apikey)
            .addQueryStringParameter('limit', 100)
            .addQueryStringParameter('offset', 0)
            .addQueryStringParameter('sort', '')
            .addQueryStringParameter('field_list', 'id,name,description,aliases,deck,image,images,original_release_date,developers,genres,publishers,platforms,site_detail_url,date_last_updated')
            .addQueryStringParameter('format', 'json').build();
        this.httpDefaultOptions = new httpoptions_1.default('http://www.giantbomb.com/api', qs);
    }
    quickSearch(searchString) {
        return __awaiter(this, void 0, void 0, function* () {
            let searchOptions = this.httpDefaultOptions.clone();
            searchOptions.url += '/search';
            searchOptions.qs.query = searchString;
            searchOptions.qs.resources = 'game';
            searchOptions.qs.field_list = 'id,name,deck,image,platforms';
            return yield this.execute(searchOptions);
        });
    }
    details(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let detailsOptions = this.httpDefaultOptions.clone();
            detailsOptions.url += `/game/3030-${id}`;
            detailsOptions.qs.field_list = '';
            return yield this.execute(detailsOptions);
        });
    }
    execute(options) {
        return __awaiter(this, void 0, void 0, function* () {
            //request.debug(true);
            console.log('Options:', options);
            try {
                let result = yield request.json(options.url, options);
                if (result.error !== 'OK') {
                    new Error(result.error);
                }
                return result;
            }
            catch (e) {
                throw e;
            }
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Giantbomb;
