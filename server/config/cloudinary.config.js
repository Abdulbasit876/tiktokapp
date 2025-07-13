  import {v2 as cloudinary} from 'cloudinary';
 cloudinary.config({ 
        cloud_name: 'djhao3ufj', 
        api_key: '178417168527824', 
        api_secret: process.env.API_SECRET||"6ml7ZhnMeukuch-PYrhClQh9uHY"
    });
export default cloudinary;
