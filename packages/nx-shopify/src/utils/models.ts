export interface EmittedFile {
  id?: string;
  name?: string;
  file: string;
  extension: string;
  initial: boolean;
  asset?: boolean;
}
