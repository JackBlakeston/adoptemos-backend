import { randomUUID } from 'crypto';

type ShortUrlSlug = `${string}_${string}`;
type LongUrlSlug = `${ShortUrlSlug}_${string}`;
export type UrlSlug = ShortUrlSlug | LongUrlSlug;

export const generateUrlSlug = (prefix?: string): UrlSlug => {
  const timeStampId = Date.now().toString(36);
  const trimmedUuid = randomUUID().substring(0, 5);
  const prefixString = prefix ? `${prefix}_` : '';

  return `${prefixString}${timeStampId}_${trimmedUuid}`;
};
