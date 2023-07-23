import { Linter } from '@nx/linter';

// @link https://code.visualstudio.com/api/references/extension-manifest
export type Categories =
  | 'Programming'
  | 'Languages'
  | 'Snippets'
  | 'Linters'
  | 'Themes'
  | 'Debuggers'
  | 'Formatters'
  | 'Keymaps'
  | 'SCM Providers'
  | 'Other'
  | 'Extension Packs'
  | 'Language Packs'
  | 'Data Science'
  | 'Machine Learning'
  | 'Visualization'
  | 'Notebooks'
  | 'Education'
  | 'Testing';

export interface Schema {
  /**
   * The name of the extension - should be all lowercase with no spaces.
   */
  name?: string;
  /**
   * The display name for the extension used in the Marketplace.
   */
  displayName: string;
  /**
   * A short description of what your extension is and does.
   */
  description?: string;
  /**
   * The categories you want to use for the extensions.
   * Allowed values: [Programming Languages, Snippets, Linters, Themes, Debuggers,
   * Formatters, Keymaps, SCM Providers, Other, Extension Packs, Language Packs,
   * Data Science, Machine Learning, Visualization, Notebooks, Education, Testing]
   */
  categories?: Categories[];
  tags?: string;
  directory?: string;
  linter?: Linter;
  importPath?: string;
  strict?: boolean;
  skipFormat?: boolean;
}
