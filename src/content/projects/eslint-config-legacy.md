---
handle: eslint-config-legacy
name: eslint-config-legacy
owner: luxass
description: 🔧 Old shareable ESLint Config
githubUrl: https://github.com/luxass/eslint-config-legacy
---

# @luxass/eslint-config

> \[!IMPORTANT]
> This config is now deprecated and migrated to use [ESLint Flat Config](https://eslint.org/docs/latest/user-guide/configuring/configuration-files#using-a-shareable-configuration-package) instead.
> Please use [@luxass/eslint-config](https://github.com/luxass/eslint-config) instead.

If you for some reason still want to use this, you can use versions prior to v4

## Installation

```bash
npm install --save-dev eslint @luxass/eslint-config@3.4.0
```

The config `@luxass/eslint-config` is just using `@luxass/eslint-config-vue` under the hood.

## Usage

`.eslintrc`

```json
{
  "extends": "@luxass"
}
```

## Packages

This is a repository that contains multiple different eslint configs:

* [JavaScript](https://github.com/luxass/eslint-config-legacy/blob/main/packages/eslint-config-js)
* [TypeScript](https://github.com/luxass/eslint-config-legacy/blob/main/packages/eslint-config-ts)
* [React](https://github.com/luxass/eslint-config-legacy/blob/main/packages/eslint-config-react)
* [Vue](https://github.com/luxass/eslint-config-legacy/blob/main/packages/eslint-config-vue)
