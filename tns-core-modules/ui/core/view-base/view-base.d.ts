import { Observable, EventData } from "data/observable";
import { Property, InheritedProperty, Style } from "../properties";
import { Binding, BindingOptions } from "ui/core/bindable";
import { isIOS, isAndroid } from "platform";
import { fromString as gestureFromString } from "ui/gestures";
import { SelectorCore } from "ui/styling/css-selector";
import { KeyframeAnimation } from "ui/animation/keyframe-animation";
import { Page } from "ui/page";
import { isEnabled as traceEnabled, write as traceWrite, categories as traceCategories, notifyEvent as traceNotifyEvent, isCategorySet } from "trace";

import * as ssm from "ui/styling/style-scope";

export {
    Observable, EventData, Binding, BindingOptions, isIOS, isAndroid,
    gestureFromString, traceEnabled, traceWrite, traceCategories, traceNotifyEvent, isCategorySet
};
export * from "../properties";

export function getEventOrGestureName(name: string): string;
export function isEventOrGesture(name: string, view: ViewBase): boolean;

export abstract class ViewBase extends Observable {
    /**
     * String value used when hooking to loaded event.
     */
    public static loadedEvent: string;

    /**
     * String value used when hooking to unloaded event.
     */
    public static unloadedEvent: string;

    /**
     * Gets or sets the id for this view.
     */
    public id: string;
    public recycleNativeView: boolean;

    public bindingContext: any;
    public nativeView: any;
    /**
     * Gets the parent view. This property is read-only.
     */
    public readonly parent: ViewBase;
    /**
     * Returns true if visibility is set to 'collapse'.
     * Readonly property
     */
    public isCollapsed;

    /**
     * Gets or sets the CSS class name for this view.
     */
    public className: string;

    public _domId: number;
    public _context: any;
    public _isAddedToNativeVisualTree: boolean;
    //@private
    public _styleScope: ssm.StyleScope;
    //@endprivate

    constructor();

    /**
     * Gets the name of the constructor function for this instance. E.g. for a Button class this will return "Button".
     */
    public readonly typeName: string;
    /**
     * Gets the style object associated to this view.
     */
    public style: Style;
    public _cssState: any /* "ui/styling/style-scope" */;
    public readonly android: any;
    public readonly ios: any;
    public readonly isLoaded: boolean;
    public class: string;
    /**
     * Gets or sets inline style selectors for this view.   
     */
    public inlineStyleSelector: SelectorCore;
    /**
     * Returns the child view with the specified id.
     */
    public getViewById<T extends ViewBase>(id: string): T;
    /**
     * Gets owner page. This is a read-only property.
     */
    public readonly page: Page;
    public onLoaded(): void;
    public _loadEachChild(): void;
    public onUnloaded(): void;

    public _applyStyleFromScope(): void;

    // TODO: Make sure the state is set to null and this is called on unloaded to clean up change listeners...
    public _setCssState(next: ssm.CssState): void;

    public cssClasses: Set<string>;
    public cssPseudoClasses: Set<string>;
    /**
     * @protected
     * @unstable
     * A widget can call this method to add a matching css pseudo class.
     */
    public addPseudoClass(name: string): void;
    /**
     * @protected
     * @unstable
     * A widget can call this method to discard mathing css pseudo class.
     */
    public deletePseudoClass(name: string): void;

    public bind(options: BindingOptions, source?: Object): void;
    public unbind(property: string): void;
    public requestLayout(): void;
    public eachChild(callback: (child: ViewBase) => boolean): void;

    public _addView(view: ViewBase, atIndex?: number): void;
    public _addViewCore(view: ViewBase, atIndex?: number): void;

    /**
    * Core logic for removing a child view from this instance. Used by the framework to handle lifecycle events more centralized. Do not outside the UI Stack implementation.
    */
    public _removeView(view: ViewBase): void;

    /**
     * Method is intended to be overridden by inheritors and used as "protected"
     */
    public _removeViewCore(view: ViewBase): void;
    /**
     * Creates a native view
     */
    _createNativeView(): void;
    /**
     * Clean up references to the native view.
     */
    _disposeNativeView(): void;
    /**
     * Initializes properties/listeners of the native view.
     */
    _initNativeView(): void;
    /**
     * Resets properties/listeners set to the native view.
     */
    _resetNativeView(): void;

    /** 
     * Setups the UI for ViewBase and all its children recursively.
     * This method should *not* be overridden by derived views.
     */
    _setupUI(context: any /* android.content.Context */, atIndex?: number): void;
    /**
     * Tears down the UI for ViewBase and all its children recursively.
     * This method should *not* be overridden by derived views.
     */
    _tearDownUI(force?: boolean): void;

    /**
     * Performs the core logic of adding a child view to the native visual tree. Returns true if the view's native representation has been successfully added, false otherwise.
     * Method is intended to be overridden by inheritors and used as "protected".
     */
    _addViewToNativeVisualTree(view: ViewBase, atIndex?: number): boolean;

    /**
     * Method is intended to be overridden by inheritors and used as "protected"
     */
    public _removeViewFromNativeVisualTree(view: ViewBase): void;

    _childIndexToNativeChildIndex(index?: number): number;

    public _goToVisualState(state: string): void;

    public _applyXmlAttribute(attribute, value): boolean;

    public setInlineStyle(style: string): void;

    public _parentChanged(oldParent: ViewBase): void;

    public _registerAnimation(animation: KeyframeAnimation): void;

    public _unregisterAnimation(animation: KeyframeAnimation): void;

    public _cancelAllAnimations(): void;
}

export const bindingContextProperty: InheritedProperty<ViewBase, any>;
export const classNameProperty: Property<ViewBase, string>;
export const idProperty: Property<ViewBase, string>;

/**
 * Iterates through all child views (via visual tree) and executes a function.
 * @param view - Starting view (parent container).
 * @param callback - A function to execute on every child. If function returns false it breaks the iteration.
 */
export function eachDescendant(view: ViewBase, callback: (child: ViewBase) => boolean);

/**
 * Gets an ancestor from a given type.
 * @param view - Starting view (child view).
 * @param criterion - The type of ancestor view we are looking for. Could be a string containing a class name or an actual type.
 * Returns an instance of a view (if found), otherwise undefined.
 */
export function getAncestor(view: ViewBase, criterion: string | Function): ViewBase;

/**
 * Gets a child view by id.
 * @param view - The parent (container) view of the view to look for.
 * @param id - The id of the view to look for.
 * Returns an instance of a view (if found), otherwise undefined.
 */
export function getViewById(view: ViewBase, id: string): ViewBase;
