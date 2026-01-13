/**
 * 过滤对象中的 null/undefined 值
 */
export const filterObjNull = <T extends Record<string, unknown>>(
    obj: T
): Partial<T> | undefined => {
    if (typeof obj !== 'object' || obj == null) return
    return Object.fromEntries(
        Object.entries(obj).filter(([_, value]) => value !== null && value !== undefined)
    ) as Partial<T>
}
