/** @type {import('next').NextConfig} */
const nextConfig = {
  // Server Actions are now available by default in Next.js 14+
  // No need for experimental.serverActions configuration
  
  // Disable SWC and use Babel instead for WebContainer compatibility
  swcMinify: false,
  
  // Configure webpack to handle the WebContainer environment
  webpack: (config, { isServer }) => {
    // Fallback for modules that might not be available in WebContainer
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    
    return config;
  },
  
  // Disable telemetry to avoid potential issues
  telemetry: {
    enabled: false,
  },
};

export default nextConfig;