import path from 'path';
import babel from '@rollup/plugin-babel';
import eslint from '@rollup/plugin-eslint';
import { terser } from 'rollup-plugin-terser'
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
            file: `${pkg.main}.umd.js`,
            format: 'umd',
            sourcemap: true,
            banner,
        },
        {
            file: `${pkg.main}.cjs.js`,
            format: 'cjs',
            exports: 'auto',
            sourcemap: true,
            banner,
        },
        {
            file: `${pkg.main}.esm.js`,
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
    ],
};
