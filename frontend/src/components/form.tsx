import {FormEvent, ReactNode} from "react";

export const Form = ({
    onSubmit,
    children,
    className,
}:{
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    children: reactNode;
    className?: string;
}) => {
    return (
        <form onSubmit={onSubmit} className={`${classname}`}>
            {children}
        </form>
    );
};