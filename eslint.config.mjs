import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

// Fix globals package
globals.browser['AudioWorkletGlobalScope'] = globals.browser['AudioWorkletGlobalScope '];
delete globals.browser['AudioWorkletGlobalScope '];

export default [
	...fixupConfigRules(
		compat.extends('eslint:recommended', 'prettier', 'plugin:react/recommended', 'plugin:react/jsx-runtime', 'plugin:react-hooks/recommended')
	),
	{
		files: ['**/*.js', '**/*.ts', '**/*.jsx'],
		plugins: {
			prettier,
			react: fixupPluginRules(react),
			'react-hooks': fixupPluginRules(reactHooks),
			'react-refresh': reactRefresh,
		},

		languageOptions: {
			globals: {
				...globals.node,
				...globals.browser,
				Atomics: 'readonly',
				SharedArrayBuffer: 'readonly',
			},

			ecmaVersion: 'latest',
			sourceType: 'module',
		},

		settings: {
			react: {
				version: 'detect',
			},
		},

		rules: {
			'prettier/prettier': 2,
			'react/jsx-no-target-blank': 'off',
			'react-refresh/only-export-components': [
				'warn',
				{
					allowConstantExport: true,
				},
			],
		},
	},
];
