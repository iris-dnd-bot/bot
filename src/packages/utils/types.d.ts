declare module '@iris-internal/typings' {
    export type OrCallable<T> = T | ((...args: unknown) => T);
    export type OrPromise<T> = T | Promise<T>;
    export type OrArray<T> = T | T[];
}
