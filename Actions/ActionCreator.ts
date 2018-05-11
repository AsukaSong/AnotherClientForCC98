export default function createAction<T extends string>(type: T): () => { type: T }
export default function createAction<T extends string, P extends (...args: any[]) => { type: T, payload: any }>(type: T, creator: P): P
export default function createAction(type, creator?) {
    return creator || (() => ({ type }))
}
