import * as url from 'url';

export const getUrlQueryName = (path: string): string => {
  return url.parse(path, true).query.name as string;
}

export default {
  getUrlQueryName
}
