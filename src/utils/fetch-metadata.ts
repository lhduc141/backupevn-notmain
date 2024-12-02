// fetchMetaData.ts
import axios from 'axios';
import { Metadata } from 'types';
import { getAppName, normalizeImageUrl } from './common';
export const convertMetadata = (data: Record<string, string>): Metadata | undefined => {
  try {
    const url = data['og:url'];
    const title = data['title'] ?? data['og:title'];
    const image = data['image'] ?? data['og:image'];
    const imageHeight = data['og:image:height'] ? Number(data['og:image:height']) : 0;
    const imageWidth = data['og:image:width'] ? Number(data['og:image:width']) : 0;
    const description = data['description'] ?? data['og:description'];
    const themeColor = data['theme-color'];
    const appName = getAppName(data);
    return {
      title,
      image: normalizeImageUrl(image, url),
      imageHeight,
      imageWidth,
      description,
      themeColor,
      appName,
      url
    };
  } catch (error) {}
};
export const fetchMetadata = async (url: string): Promise<Record<string, string> | undefined> => {
  try {
    const response = await axios.get(url);
    const html = response.data;

    /** Tạo một DOM parser để phân tích cú pháp HTML */
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    /**  Lấy các thẻ meta */
    const metaTags: HTMLMetaElement[] = Array.from(doc.getElementsByTagName('meta'));
    const metaData: Record<string, string> = {};

    /**  Lặp qua các thẻ meta */
    metaTags.forEach((tag) => {
      const name = tag.getAttribute('name');
      const property = tag.getAttribute('property');
      const content = tag.getAttribute('content');

      if (name) {
        metaData[name] = content || '';
      } else if (property) {
        metaData[property] = content || '';
      }
    });

    return metaData;
  } catch (err: any) {
    // throw new Error('Error fetching metadata: ' + err.message);
    console.error('Error fetching metadata: ' + err.message);
    return undefined;
  }
};
