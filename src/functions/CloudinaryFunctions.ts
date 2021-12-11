import { cloudinarySizes } from '../constants';
import { Photo } from '../models';

export const Cloudinary = {
  construct: (list: Photo.GetAllCloudinaryApi[]): Photo.GetAllCloudinary[] => {
    let projects: Photo.GetAllCloudinary[] = [];
    for (let i = 0; i < list.length; i++) {
      const name = list[i].public_id.split('/')[1].split('_');
      const url = list[i].secure_url.split('upload');

      projects.push({
        id: list[i].public_id.split('projects/')[1],
        name: `${name[0]} ${name[1]}`,
        url: list[i].url,
        sm: `${url[0]}upload/${cloudinarySizes.sm}${url[1]}`,
        md: `${url[0]}upload/${cloudinarySizes.md}${url[1]}`,
        lg: `${url[0]}upload/${cloudinarySizes.lg}${url[1]}`,
        xl: `${url[0]}upload/${cloudinarySizes.xl}${url[1]}`,
        sharp_img: `${url[0]}upload/${cloudinarySizes.sharp_img}${url[1]}`,
        description: '',
        technologies: [],
        show: false
      });
    }
    return projects;
  }
};