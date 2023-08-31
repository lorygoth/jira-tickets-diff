import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
//import { terser } from "rollup-plugin-terser";

const dev = process.env.ROLLUP_WATCH;

// https://github.com/custom-cards/spotify-card/blob/master/rollup.config.js

export default {
  input: 'src/main.ts',
  output: {
    file: 'dist/bundle.js',
    // format: 'iife',
    format: 'esm',
    sourcemap: dev ? true : false,
  },
  plugins: [
    typescript({
      tsconfig: './tsconfig.build.json',
    }),
    nodeResolve(),
    // terser(),
  ],
};
