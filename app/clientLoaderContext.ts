const memoryStore: Record<string, unknown> = {}

export const clientLoaderContext = {
  get: <TData>(key: string)=> memoryStore[key] as TData | undefined,
  set: <TData>(key: string, value: TData) => memoryStore[key] = value,
}
