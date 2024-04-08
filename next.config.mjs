/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https", // Assuming wallpaperaccess.com uses HTTPS
                hostname: "wallpaperaccess.com",
            },
        ],
    },
};

export default nextConfig;
