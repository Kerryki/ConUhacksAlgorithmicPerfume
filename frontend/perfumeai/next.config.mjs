/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  output: 'standalone', // Optimized for containerized deployments like Railway
};

export default nextConfig;
