import React, { LinkHTMLAttributes, HTMLAttributes, DetailedHTMLFactory } from 'react';
import './style.scss';

export type VariantType =  
'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' |'dark';

type Div = DetailedHTMLFactory<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export interface Props {
    variant?: VariantType,
    children?: React.ReactNode
}

function Alert({variant='primary', children}: Props) {
    const variantClassName = `alert-${variant}`;

    return (
        <div className={`alert ${variantClassName}`} role="alert">
            {children}
        </div>
    )
}

Alert.Link = function({href, children}: {href?: string, children?: React.ReactNode}) {
    // const lintClassName = ``;

    return (
        <a className={'alert-link'} role="button" href={href}>
            {children}
        </a>
    )
}


export default Alert;
