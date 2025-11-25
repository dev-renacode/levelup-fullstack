const webpackConfig = require('./webpack.config.cjs')

module.exports = function(config){
    config.set({
        frameworks: ['jasmine'],

        files: [
            'src/test/unit/**/*.test.js'
        ],

        preprocessors: {
            'src/test/unit/**/*.test.js': ['webpack']
        },

        webpack: {
            ...webpackConfig,
            mode: 'development',
            resolve: {
                ...webpackConfig.resolve,
                alias: {
                    ...webpackConfig.resolve.alias,
                }
            }
        },

        browsers: ['Chrome'],
        reporters: ['progress'],
        logLevel: config.LOG_INFO,
        autoWatch: true,
        singleRun: process.env.CI === 'true',
        concurrency: Infinity,
        plugins: [
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-webpack'
        ],
        
        // Asegurar que Jasmine se carga correctamente
        client: {
            jasmine: {
                random: true,
                seed: '4321',
                stopOnFailure: false
            },
            clearContext: false
        }
    })
}
