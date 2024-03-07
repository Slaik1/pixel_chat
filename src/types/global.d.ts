declare module '*.module.scss';
type ValueOf<T> = T[keyof T];
type SetAction<T> = Dispatch<SetStateAction<T>>;