import alias from '@rollup/plugin-alias';

export default {
  input: 'src/main.tsx',
  output: {
    dir: 'output',
    format: 'es',
  },
  plugins: [
    alias({
      entries: [
        { find: 'image', replacement: './src/assets/image' },
        { find: 'fonts', replacement: './public/fonts' },
      ],
    }),
  ],
};
