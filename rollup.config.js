import path from 'path';
import eslint from '@rollup/plugin-eslint';
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
    plugins: [],
};
