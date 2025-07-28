import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

/**
 * @param obj 对象
 * @description 过滤掉对象中值为 null 或 undefined 的属性, 便于处理接口对接
 * @returns
 */
export const filterObjNull = <T extends Record<string, any>>(obj: T): Partial<T> | undefined => {
	if (typeof obj !== "object" || obj == null) return
	return Object.fromEntries(
		Object.entries(obj).filter(([_, value]) => value !== null && value !== undefined),
	) as Partial<T>
}
