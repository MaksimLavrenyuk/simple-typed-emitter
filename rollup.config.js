import path from 'path';
import babel from '@rollup/plugin-babel';
import eslint from '@rollup/plugin-eslint';
import cleaner from 'rollup-plugin-cleaner';
import { terser } from 'rollup-plugin-terser';
import license from 'rollup-plugin-license';
import ts from 'rollup-plugin-typescript2';
import pkg from './package.json';

const isProduction = process.env.NODE_ENV !== 'dev';
const extensions = ['.js', '.ts'];
const banner =  `/*! ${pkg.name} ${pkg.version} */`

export default {
    input: 'src/index.ts',
    external: [
        ...Object.keys(pkg.dependencies || {}),
    ],
    output: [
        {
            name: 'EventEmitter',
            file: pkg.browser,
            format: 'umd',
            sourcemap: true,
            banner,
        },
        {
            file: pkg.main,
            format: 'cjs',
            exports: 'auto',
            sourcemap: true,
            banner,
        },
        {
            file: pkg.module,
            format: 'esm',
            sourcemap: true,
            banner,
        },
    ],
    plugins: [
        eslint(),
        ts({
            tsconfigOverride: {
                exclude: ["**/__tests__", "**/*.test.ts"]
            }
        }),
        babel({
            extensions,
            include: ['src/**/*'],
            babelHelpers: 'bundled',
        }),
        terser(),
        isProduction ? license({
            banner: {
                content: {
                    file: path.join(__dirname, 'LICENSE'),
                    encoding: 'utf-8',
                },
            },
        }) : {},
        isProduction ? cleaner({
            targets: [
                './dist/'
            ]
        }) : {}
    ],
};
