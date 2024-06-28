const { withNextVideo } = require('next-video/process')

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'oevsvjkpdlznvfenlttz.supabase.co',
            port: '',
            pathname: '/storage/v1/object/public/**',
          },
        ],
      },
};

module.exports = withNextVideo(nextConfig);
