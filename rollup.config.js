import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import metablock from 'rollup-plugin-userscript-metablock';
import fs from 'fs';

const dev = process.env.ROLLUP_WATCH;
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

export default {
  input: 'src/main.ts',
  output: {
    file: 'dist/jira-tickets-diff.user.js',
    format: 'iife',
    sourcemap: dev ? true : false,
  },
  plugins: [
    typescript({
      tsconfig: './tsconfig.build.json',
    }),
    nodeResolve(),
    metablock({
      file: './meta.json',
      override: {
        name: pkg.name,
        version: pkg.version,
        description: pkg.description,
        homepage: pkg.repository,
        author: pkg.author,
        license: pkg.license,
      },
    }),
  ],
};
