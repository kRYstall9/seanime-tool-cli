#!/usr/bin/env node

import {engines} from 'package.json';
import semver from 'semver';

const requiredVersion = engines.node;
const currentVersion = process.version;

if (!semver.satisfies(currentVersion, requiredVersion)) {
  console.error(
    `\n❌ Unsupported Node.js version: ${currentVersion}\n` +
    `👉 This package requires Node.js ${requiredVersion}\n`
  );
  process.exit(1);
}
