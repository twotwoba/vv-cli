/**
 * Copy from await-to-js https://github.com/scopsy/await-to-js
 * just change function name `to` to `till`
 * @param { Promise } promise
 * @param { Object= } errorExt - Additional Information you can pass to the err object
 * @return { Promise }
 */
export function till<T, U = Error>(promise: Promise<T>, errorExt?: object): Promise<[U, undefined] | [null, T]> {
    return promise
        .then<[null, T]>((data: T) => [null, data])
        .catch<[U, undefined]>((err: U) => {
            if (errorExt) {
                const parsedError = Object.assign({}, err, errorExt)
                return [parsedError, undefined]
            }

            return [err, undefined]
        })
}

export default till
