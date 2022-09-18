module.exports = {
    plugins: {
        'postcss-flexbugs-fixes': {},
        'postcss-import': {}, // @import 能力，注意: 应在 autoprefixer 之前执行
        'postcss-nested': {}, // 支持嵌套
        'postcss-preset-env': {
            // 支持实验性语法版本
            stage: 0, // 默认 Stage 2
            features: {
                'nesting-rules': true // 嵌套
            }
        },
        cssnano: {
            // 压缩 css
            preset: 'default'
        },
        autoprefixer: {
            overrideBrowserslist: [
                '>1%',
                'last 0 versions',
                'Firefox ESR',
                'not ie < 9' // React doesn't support IE8 anyway
            ]
        }
    }
};
