// @ts-check
import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';
import { sidebar } from './astro.sidebar.ts';
import { devServerFileWatcher } from './config/integrations/dev-server-file-watcher.ts';

// https://astro.build/config
export default defineConfig({
	integrations: [
		devServerFileWatcher([
			'./config/*',
			'./astro.sidebar.ts',
		]),
		starlight({
			title: 'ScopeDB',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/scopedb/scopedb-docs' }],
			sidebar
		}),
	],
});
