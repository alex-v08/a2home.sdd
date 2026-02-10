/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['react-native-web', '@a2home/ui'],
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native$': 'react-native-web',
    }
    return config
  },
}

module.exports = nextConfig
