import { Style } from "../../styling/style";
import * as base from "../view-base";

export { Style };

export function _isSet(cssProperty: CssProperty<any, any>, instance: Style): boolean;
export function _printUnregisteredProperties(): void;

export class Property<T extends base.ViewBase, U> implements TypedPropertyDescriptor<U>, base.Property<T, U> {
    public readonly name: string;
    public readonly key: symbol;
    public readonly native: symbol;
    public readonly defaultValueKey: symbol;
    public readonly defaultValue: U;
    public readonly nativeValueChange: (owner: T, value: U) => void;

    public get: () => U;
    public set: (value: U) => void;
    public enumerable: boolean;
    public configurable: boolean;

    constructor(options: base.PropertyOptions<T, U>);

    public register(cls: { prototype: T }): void;
}

export class CoercibleProperty<T extends base.ViewBase, U> extends Property<T, U> implements base.CoercibleProperty<T, U> {
    public readonly coerce: (target: T) => void;

    constructor(options: base.CoerciblePropertyOptions<T, U>);
}

export class InheritedProperty<T extends base.ViewBase, U> extends Property<T, U> implements base.InheritedProperty<T, U> {
    public readonly sourceKey: symbol;
    public readonly setInheritedValue: (value: U) => void;

    constructor(options: base.PropertyOptions<T, U>);
}

export class CssProperty<T extends Style, U> implements base.CssProperty<T, U> {
    public readonly name: string;
    public readonly cssName: string;
    public readonly cssLocalName: string;

    public readonly key: symbol;
    public readonly native: symbol;
    public readonly sourceKey: symbol;
    public readonly defaultValueKey: symbol;
    public readonly defaultValue: U;

    constructor(options: base.CssPropertyOptions<T, U>);

    public register(cls: { prototype: T }): void;
}

export class CssAnimationProperty<T extends Style, U> {
    public readonly name: string;
    public readonly cssName: string;

    public readonly native: symbol;
    public readonly register: (cls: { prototype }) => void;

    public readonly keyframe: string;
    public readonly defaultValueKey: symbol;

    public _valueConverter?: (value: string) => any;

    constructor(options: base.CssAnimationPropertyOptions<T, U>);

    public static _getByCssName(name: string): CssAnimationProperty<any, any>;
}

export class InheritedCssProperty<T extends Style, U> extends CssProperty<T, U> implements base.InheritedCssProperty<T, U> {
    public setInheritedValue: (value: U) => void;

    constructor(options: base.CssPropertyOptions<T, U>);
}

export class ShorthandProperty<T extends Style, P> implements base.ShorthandProperty<T, P> {
    public readonly key: symbol;
    public readonly name: string;
    public readonly cssName: string;
    public readonly cssLocalName: string;

    public readonly native: symbol;
    public readonly sourceKey: symbol;

    constructor(options: base.ShorthandPropertyOptions<P>);

    public register(cls: { prototype: T }): void;
}

export function initNativeView(view: base.ViewBase): void;
export function resetNativeView(view: base.ViewBase): void;
export function clearInheritedProperties(view: base.ViewBase): void;
export function resetCSSProperties(style: Style): void;
export function propagateInheritableProperties(view: base.ViewBase): void;
export function propagateInheritableCssProperties(style: Style): void;
export function makeValidator<T>(...values: T[]): (value: any) => value is T;
export function makeParser<T>(isValid: (value: any) => boolean): (value: any) => T;

//@private
export function _isSet(cssProperty: CssProperty<any, any>, instance: Style): boolean;
//@endprivate

/**
 * Value specifing that Property should be set to its initial value.
 */
export const unsetValue: any;

export interface PropertyOptions<T, U> {
    readonly name: string;
    readonly defaultValue?: U;
    readonly affectsLayout?: boolean;
    readonly equalityComparer?: (x: U, y: U) => boolean;
    readonly valueChanged?: (target: T, oldValue: U, newValue: U) => void;
    readonly valueConverter?: (value: string) => U;
}

export interface CoerciblePropertyOptions<T, U> extends PropertyOptions<T, U> {
    readonly coerceValue: (t: T, u: U) => U;
}

export interface CssPropertyOptions<T extends Style, U> extends PropertyOptions<T, U> {
    readonly cssName: string;
}

export interface CssAnimationPropertyOptions<T, U> {
    readonly name: string;
    readonly cssName?: string;
    readonly defaultValue?: U;
    readonly equalityComparer?: (x: U, y: U) => boolean;
    readonly valueChanged?: (target: T, oldValue: U, newValue: U) => void;
    readonly valueConverter?: (value: string) => U;
}

export interface ShorthandPropertyOptions<P> {
    readonly name: string,
    readonly cssName: string;
    readonly converter: (value: string | P) => [CssProperty<any, any>, any][],
    readonly getter: (this: Style) => string | P
}

export function initNativeView(view: base.ViewBase): void;
export function resetNativeView(view: base.ViewBase): void;
export function resetCSSProperties(style: Style): void;
export function propagateInheritableProperties(view: base.ViewBase): void;
export function propagateInheritableCssProperties(style: Style): void;

export function makeValidator<T>(...values: T[]): (value: any) => value is T;
export function makeParser<T>(isValid: (value: any) => boolean): (value: any) => T;
