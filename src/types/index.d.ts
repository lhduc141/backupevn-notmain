export {};

interface Env {
  [key: string]: string | undefined;
}

declare global {
  interface Window {
    env?: Env;
  }
}
export * from './dto';
export * from './emoji.type';
export * from './file-upload.type';
export * from './message-position.type';
export * from './metadata.type';
export * from './use-query-options-type';
export * from './icon-item.type';
