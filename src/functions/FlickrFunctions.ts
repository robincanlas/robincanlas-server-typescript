import { Photo } from '../models';

export const Flickr = {
  constructFlickrPhotos: (photos: Photo.GetAllFlickrApi[]): Photo.GetAllFlickr[] => {
    let newPhotos: Photo.GetAllFlickr[] = [];
    for (let i = 0; i < photos.length; i++) {
      newPhotos.push({
        id: i,
        index: i,
        thumbnail: `https://farm${photos[i].farm}.staticflickr.com/${photos[i].server}/${photos[i].id}_${photos[i].secret}_z.jpg`,
        url: `https://farm${photos[i].farm}.staticflickr.com/${photos[i].server}/${photos[i].id}_${photos[i].secret}_b.jpg`,
        src: `https://farm${photos[i].farm}.staticflickr.com/${photos[i].server}/${photos[i].id}_${photos[i].secret}_b.jpg`,
        raw: `https://farm${photos[i].farm}.staticflickr.com/${photos[i].server}/${photos[i].id}_${photos[i].secret}`,
        original: photos[i].url_o
      });
    }
    return newPhotos;
  }
};