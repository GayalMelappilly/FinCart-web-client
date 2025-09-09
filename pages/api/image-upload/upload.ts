import { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from 'cloudinary';
import { UploadOptions } from '@/app/types/cloudinary/types';

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { image, video, media, temp } = req.body;
      
      // Get the media data (could be image, video, or generic media)
      const mediaData = image || video || media;
      
      if (!mediaData) {
        return res.status(400).json({ error: 'No media data provided' });
      }

      // Determine if it's a video based on the data URL prefix
      const isVideo = mediaData.startsWith('data:video/');
      
      // Prepare upload options
      const uploadOptions: UploadOptions = {
        folder: 'fincarts-user-profile',
        resource_type: isVideo ? 'video' : 'image',
      };

      // If temp === true, add tags for later cleanup
      if (temp && temp === true) {
        uploadOptions.tags = ['temp', 'delete_after_30_days'];
        // Add timestamp to track when it was uploaded
        uploadOptions.context = `uploaded_at=${Date.now()}`;
      }
      
      // Upload to Cloudinary
      const result = await cloudinary.v2.uploader.upload(mediaData, uploadOptions);

      // Return the media URL
      res.status(200).json({ 
        url: result.secure_url,
        public_id: result.public_id,
        type: isVideo ? 'video' : 'image',
        resource_type: result.resource_type,
        scheduled_delete: temp === true ? 'tagged for cleanup' : 'no'
      });
    } catch (error) {
      console.error('Error uploading media:', error);
      res.status(500).json({ error: 'Failed to upload media' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
};
