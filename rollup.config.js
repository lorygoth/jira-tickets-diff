import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import metablock from 'rollup-plugin-userscript-metablock';
import fs from 'fs';

const dev = process.env.ROLLUP_WATCH;
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const file = process.env.BUNDLE_PATH || 'bundle.js';

export default {
  input: 'src/main.ts',
  output: {
    file,
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
        homepage: process.env.REPOSITORY_URL,
        author: pkg.author,
        license: pkg.license,
        downloadURL: process.env.GIST_URL,
        updateURL: process.env.GIST_URL,
        include: 'https://*.atlassian.net/*',
        match: 'https://*.atlassian.net/*',
        icon: 'https://www.google.com/s2/favicons?sz=64&domain=atlassian.net',
      },
    }),
  ],
};
