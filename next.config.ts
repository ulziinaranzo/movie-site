import { NextConfig } from "next";

const nextConfig: NextConfig = {
    env: {
        Access_Token: process.env.Access_Token
    }
};

export default nextConfig;