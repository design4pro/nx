import { addDependenciesToPackageJson, Tree } from '@nrwl/devkit';
import {
  autoprefixerVersion,
  cssnanoVersion,
  nxWebpackVersion,
  postcssImportVersion,
  postcssNestingVersion,
  postcssPresetEnvVersion,
  postcssVersion,
  tailwindcssNestingVersion,
  tailwindcssVersion,
} from '../../../utils/versions';

export function updateDependencies(tree: Tree) {
  const devDependencies = {};
  const dependencies = {};

  dependencies['@nrwl/webpack'] = nxWebpackVersion;
  dependencies['@tailwindcss/nesting'] = tailwindcssNestingVersion;
  dependencies['autoprefixer'] = autoprefixerVersion;
  dependencies['cssnano'] = cssnanoVersion;
  dependencies['postcss'] = postcssVersion;
  dependencies['postcss-import'] = postcssImportVersion;
  dependencies['postcss-nesting'] = postcssNestingVersion;
  dependencies['postcss-preset-env'] = postcssPresetEnvVersion;
  dependencies['tailwindcss'] = tailwindcssVersion;

  return addDependenciesToPackageJson(tree, dependencies, devDependencies);
}
