
export interface CloudinaryOptions {
    width?: number;
    height?: number;
    crop?: 'fill' | 'limit' | 'scale' | 'pad' | 'thumb';
    quality?: 'auto' | number;
    format?: 'auto' | 'webp' | 'jpg' | 'png';
    effect?: string;
}

export const getOptimizedImageUrl = (
    imageUrl: string, 
    options: CloudinaryOptions = {}
): string => {
    if (!imageUrl) return '/placeholder.jpg';
    

    if (!imageUrl.includes('cloudinary.com')) {
        return imageUrl;
    }
    
    const {
        width = 400,
        height = 400,
        crop = 'fill',
        quality = 'auto',
        format = 'auto'
    } = options;
    

    const parts = imageUrl.split('/upload/');
    if (parts.length !== 2) return imageUrl;
    
    const transformations = [
        `w_${width}`,
        `h_${height}`,
        `c_${crop}`,
        `q_${quality}`,
        `f_${format}`
    ].join(',');
    
    return `${parts[0]}/upload/${transformations}/${parts[1]}`;
};


export const getResponsiveImageSrcset = (
    imageUrl: string,
    sizes: number[] = [300, 500, 800, 1200]
): string => {
    if (!imageUrl.includes('cloudinary.com')) return '';
    
    return sizes
        .map(size => `${getOptimizedImageUrl(imageUrl, { width: size })} ${size}w`)
        .join(', ');
};


export const getBlurPlaceholder = (imageUrl: string): string => {
    if (!imageUrl.includes('cloudinary.com')) return imageUrl;
    
    return getOptimizedImageUrl(imageUrl, { 
        width: 20, 
        height: 20, 
        quality: 10 
    });
};