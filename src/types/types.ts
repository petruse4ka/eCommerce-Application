export type ActionHandler = () => void;

export type ValidationFunction = (value: string, secondValue?: string) => string | null;
