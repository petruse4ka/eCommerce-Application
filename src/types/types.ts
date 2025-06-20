export type ActionHandler = () => void;
export type ActionWithArgumentHandler<T> = (itemsCount?: T) => void;

export type ValidationFunction = (value: string) => string | null;
export type Attributes = { [key: string]: string | number | boolean | string[] };
export type ProductPrices = { [key: string]: string | number | boolean | string[] };
export type Crewman = { NAME: string; NICKNAME: string; GITHUB: string };
export type UpdateViewTotalCart = (parameters: { isLoading: boolean; success: boolean }) => void;
