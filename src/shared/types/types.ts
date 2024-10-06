// Тип для опций
export type Options<T, K extends string> = {
  [key in K]?: T;
} & {
  readonly id?: number;
  rus?: string;
};

// Тип для направлений
export type Direction = "there" | "return";
