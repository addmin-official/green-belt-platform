export interface ErrorReporter {
  reportError(error: Error, metadata: any): void;
}
