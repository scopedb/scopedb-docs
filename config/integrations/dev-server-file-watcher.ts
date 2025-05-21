// dev-server-file-watcher.ts
// 
// This file is adapted and modified from Astro Docs (https://github.com/withastro/docs)
// 
// Licensed under the MIT License
// 
// Copyright (c) 2022 withastro
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import type { AstroIntegration } from 'astro';
import glob from 'fast-glob';

/**
 * Astro integration that registers the passed paths so that saving them triggers a dev server
 * restart.
 *
 * It also supports passing glob patterns to watch a set of files matching a specific pattern.
 *
 * @param paths Array of file paths relative to the project root.
 *
 * @example
 * // astro.config.mjs
 * export default {
 *   integrations: [
 *     devServerFileWatcher(["./example.js", "./src/content/demo/*.yml"]),
 *   ],
 * }
 */
export const devServerFileWatcher = (paths: string[]) =>
    ({
        name: 'dev-server-file-watcher',
        hooks: {
            async 'astro:config:setup'({ addWatchFile, config }) {
                for (const path of paths) {
                    const files = await glob(path);
                    files.forEach((file) => addWatchFile(new URL(file, config.root)));
                }
            },
        },
    }) satisfies AstroIntegration;
