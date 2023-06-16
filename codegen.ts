import { CodegenConfig } from '@graphql-codegen/cli';
import dotenv from 'dotenv';
dotenv.config();

const config: CodegenConfig = {
  // schema: import.meta.env.VITE_BACKEND,
  // schema: process.env.VITE_BACKEND,
  schema: 'https://gamelist.up.railway.app/graphql/',
  documents: ['src/**/*.tsx', 'src/**/*.ts'],
  generates: {
    './src/graphql/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
