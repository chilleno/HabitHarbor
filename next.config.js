/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.module.rules.push({
            test: /\.(ogg|mp3|wav|mpe?g)$/i,
            loader: 'file-loader',
            options: {
                name: '[path][name].[ext]',
            },
        });

        return config;
    },
    sassOptions: {
        includePaths: ['./src'],
    },
}

module.exports = nextConfig
