const ELEMENT_NODE_TYPE = 1;

function objectToString(value: unknown): string {
    return Object.prototype.toString.call(value);
}

export const isClient = !!(
    typeof window !== 'undefined' &&
    typeof document !== 'undefined' &&
    window.document &&
    window.document.createElement
);

export const isObject = (value: unknown): value is Record<any, any> => value !== null && typeof value === 'object';
export const isPureObject = (value: unknown): value is Record<any, any> => objectToString(value) === '[object Object]';
export const isFunction = (value: unknown): value is Function => typeof value === 'function';
export const isNumber = (value: unknown): value is number => typeof value === 'number';
export const isString = (value: unknown): value is string => typeof value === 'string';
export const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean';
export const isElement = (value: Element): value is Element => value.nodeType === ELEMENT_NODE_TYPE;
export const isWindow = (element: any | Window): element is Window => (isClient ? element === window : false);

export const isVoid = (value: unknown): value is undefined | null => value === undefined || value === null;
export const isExist = (value: unknown): value is NonNullable<undefined | null> => !isVoid(value);
