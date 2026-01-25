import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  output: 'standalone', // Optimized for containerized deployments like Railway
  experimental: {
    turbo: {
      root: __dirname,
    },
  },
};

export default nextConfig;
