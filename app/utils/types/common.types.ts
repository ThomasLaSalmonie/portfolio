/** Locales available in the app */
export type Lang = 'fr' | 'en';

export type Nullable<T> = T | null;

/** Makes an interface to also be undefined */
export type Maybe<T> = T | undefined;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyObject<T = any> = Record<string, T>;
export type UnknownObject = Record<string, unknown>;
export type EmptyObject = Record<string, never>;
export type GenericObject = AnyObject | UnknownObject | EmptyObject;
