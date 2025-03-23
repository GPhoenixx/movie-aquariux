module.exports = {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
        [
            'module-resolver',
            {
                root: ['./'],
                alias: {
                    '@': './',
                    '@components': './src/components',
                    '@models': './src/models',
                    '@screens': './src/screens',
                    '@repositories': './src/repositories',
                    '@const': './src/const',
                    '@utils': './src/utils',
                    '@global-state': './src/global-state',
                    '@assets': './assets',
                },
            },
        ],
    ],
};
