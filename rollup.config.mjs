import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'


export default {
    input: 'src/index.ts',
    output: [
        {
            file: "dist/index.cjs",
            format: "cjs",
        },
        {
            file: "dist/index.mjs",
            format: "es",
        },
    ],
    cache: false,
    plugins: [
        resolve(),
        commonjs(),
        typescript({
            tsconfig: './tsconfig.json',
            compilerOptions: {
                incremental: false,
            },
        }),
        terser(),
    ],
}
