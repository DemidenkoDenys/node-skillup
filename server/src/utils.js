import * as url from 'url';
export const getUrlQueryName = (path) => {
    return url.parse(path, true).query.name;
};
export default {
    getUrlQueryName
};
