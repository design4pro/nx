import { JsonObject } from '@angular-devkit/core';

export interface BuildExecutorSchema extends JsonObject {
  clean?: boolean;
  noOptimization?: boolean;
} // eslint-disable-line
