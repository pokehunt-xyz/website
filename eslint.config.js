import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

// Fix globals package
globals.browser['AudioWorkletGlobalScope'] = globals.browser['AudioWorkletGlobalScope '];
delete globals.browser['AudioWorkletGlobalScope '];

const eslintConfig = [
	...fixupConfigRules(
		compat.extends('eslint:recommended', 'plugin:@typescript-eslint/eslint-recommended', 'plugin:@typescript-eslint/recommended', 'prettier')
	),
	{
		files: ["src/**/*.{ts,tsx,js,jsx}"],
		plugins: {
			prettier,
			react,
			'react-hooks': reactHooks,
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

export default eslintConfig;
