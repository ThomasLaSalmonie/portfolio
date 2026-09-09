/** Locales available in the app */
export type Lang = 'fr' | 'en';

/**
 * A string that may carry per-locale variants. A bare `string` means "the same
 * in every locale", so data files can be translated field by field. Resolve it
 * with `loc()` from `~/utils/i18n`.
 */
export type LocalizedText = string | Partial<Record<Lang, string>>;

export type Nullable<T> = T | null;

/** Makes an interface to also be undefined */
export type Maybe<T> = T | undefined;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyObject<T = any> = Record<string, T>;
export type UnknownObject = Record<string, unknown>;
export type EmptyObject = Record<string, never>;
export type GenericObject = AnyObject | UnknownObject | EmptyObject;
