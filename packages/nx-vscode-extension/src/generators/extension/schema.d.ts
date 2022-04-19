export interface Schema {
  name: string;
  displayName: string;
  description?: string;
  tags?: string;
  directory?: string;
  skipFormat?: boolean;
}

export interface NormalizedSchema extends Schema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[];
}
