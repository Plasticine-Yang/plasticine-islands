export type DeepPartial<T> = T extends Record<PropertyKey, any>
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T

export type DeepRequired<T> = T extends Record<PropertyKey, any>
  ? {
      [P in keyof T]-?: DeepRequired<T[P]>
    }
  : T
