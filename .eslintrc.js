module.exports = {
    // 为我们提供运行环境，一个环境定义了一组预定义的全局变量
    env: {
        browser: true,
        node: true,
        es2021: true
    },
    // 一个配置文件可以被基础配置中的已启用的规则继承
    // eslint-config-prettier(prettier) 配置会覆盖先前 extends 数组中一些配置，禁掉所有 ESLint 的代码格式规则。有了这个配置，Prettier 和 ESLint 就可以相安无事地独自运行了
    extends: ['next/core-web-vitals', 'prettier'],
    // 自定义全局变量
    globals: {},
    // ESLint 支持使用第三方插件
    // 在配置文件里配置插件时，可以使用 plugins 关键字来存放插件名字的列表。插件名称可以省略 eslint-plugin- 前缀
    // 让 ESLint 集成 Prettier
    plugins: ['react-hooks', '@typescript-eslint', 'prettier'],
    // ESLint 附带有大量的规则。你可以使用注释或配置文件修改你项目中要使用的规则。要改变一个规则设置，你必须将规则 ID 设置为下列值之一
    // "off" 或 0 - 关闭规则
    // "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
    // "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
    rules: {
        'prettier/prettier': 'error',
        '@typescript-eslint/consistent-type-imports': 'error',
        'react-hooks/rules-of-hooks': 'error', // 检查 Hook 的规则
        'react-hooks/exhaustive-deps': 'warn' // 检查 effect 的依赖
    }
};
