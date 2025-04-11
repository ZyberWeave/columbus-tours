import fs from 'fs';
import path from 'path';

export function getTourImages(category: string, folder: string): string[] {
  const slideshowPath = path.join(process.cwd(), 'public', 'images', 'tours', category.toLowerCase(), folder, 'slideshow');
  
  try {
    return fs.readdirSync(slideshowPath)
      .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file));
  } catch (error) {
    console.warn(`No images found for tour: ${category}/${folder}`);
    return [];
  }
}