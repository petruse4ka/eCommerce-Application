export type ActionHandler = () => void;

export type ValidationFunction = (value: string) => string | null;
export type Attributes = { [key: string]: string | number | boolean | string[] };
