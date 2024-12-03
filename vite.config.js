/// <reference types="vitest" />
/// <reference types="vite/client" />

import { ConfigEnv, CSSOptions, defineConfig, PluginOption, ServerOptions, UserConfig } from "vite";
import react from '@vitejs/plugin-react-swc'
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import { InlineConfig } from "vitest/node";

/**
 * @type ServerOptions
 */
const ServerOptionProps = {
  port: 3000,
  host: "127.0.0.1",
};

/**
 * @type CSSOptions
 */
const CSSDevOptionProps = {
  postcss: {
    plugins: [autoprefixer],
  },
  modules: {
    localsConvention: "camelCaseOnly",
    exportGlobals: true,
  },
}

/**
 * @type CSSOptions
 */
const CSSOptionProps = {
  postcss: {
    plugins: [autoprefixer, cssnano],
  },
  modules: {
    localsConvention: "camelCaseOnly",
    exportGlobals: true,
  },
}

/**
 * @type InlineConfig
 */
const VitestConfig = {
  environment: 'jsdom',
  globals: true,
  setupFiles: ['tests/setup.js']
}

/**
 * @type PluginOption[] | undefined
 */
const VitePluginArray = [react()]

/**
 * 
 * @param {ConfigEnv} param0 
 * @returns {UserConfig}
 */
function UserConfigFunction({ command }) {
  if (command === "serve") {
    return {
      server: ServerOptionProps,
      css: CSSDevOptionProps,
      plugins: VitePluginArray,
      test: VitestConfig
    };
  } else if (command === 'build') {
    return {
      server: ServerOptionProps,
      css: CSSOptionProps,
      plugins: VitePluginArray,
    };
  }
}

/** @type {import('vite').UserConfig} */
export default defineConfig(UserConfigFunction);
