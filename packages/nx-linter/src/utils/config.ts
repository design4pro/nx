import { TargetConfiguration } from '@nrwl/devkit';
import { Configuration as StylelintConfiguration } from 'stylelint';

/** Root Stylelint configuration that will be added on Init */
export const recommendedRootStylelintConfiguration: Partial<StylelintConfiguration> = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-idiomatic-order',
    'stylelint-config-prettier',
  ],
  ignoreFiles: ['node_modules/**', 'dist/**'],
  rules: {
    'order/properties-alphabetical-order': null,
  },
};

/** Default target configuration for projects */
export const defaultTargetConfiguration: TargetConfiguration = {
  executor: 'nx-linter:stylelint',
};
