require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require ('path');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

const imagesFolder = path.join(__dirname, 'uploads', 'products');
async function uploadAllImages(){

    console.log('Starting image upload to Cloudinary...');

    if(!fs.existsSync(imagesFolder)) {
        console.error('Folder not found!');
        console.error(`Expected folder path: ${imagesFolder}`);
        return;
    }
    const files = fs.readdirSync(imagesFolder);

    const imageFiles = files.filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
    });
    console.log(` Found ${imageFiles.length} images to upload\n.`);
    const uploadedUrls = {};

    for(const file of imageFiles) {
        const  filePath = path.join(imagesFolder, file);
        const fileName = path.parse(file).name;
         
        try{
            console.log(`Uploading: ${file}...`);
            const result = await cloudinary.uploader.upload(filePath, {
                folder: 'products',
                public_id: fileName,
                overwrite: true
            });

            uploadedUrls[fileName] = result.secure_url;

            console.log(`Uploaded ${file} successfully: ${result.secure_url}\n`);

        } catch (error) {
            console.error(`Error uploading ${file}:`, error.message);
        }
    }
    console.log('Image upload completed.');
     for (const [name, url] of Object.entries(uploadedUrls)) {
    console.log(`  "${name}": "${url}",`);
    return uploadedUrls;

   
  }
}
uploadAllImages();