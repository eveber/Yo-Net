import React from "react";
import css from './CustomControls.module.scss';

//Custom Form Control
export const CustomFormControl = React.memo(({input, meta, ...props}) => {
    let Tag = props.tag;
    let hasError = meta.touched && meta.error;
    let className = '';

    if (Tag === 'textarea') {
        className = css.site_textarea + " " + (hasError ? css.on_custom_control_error : '')
    }

    if (Tag === 'input') {
        className = css.site_input + " " + (hasError ? css.on_custom_control_error : '')
    }

    return (
        <>
            {hasError && <span className={css.custom_control_error_message}>*{meta.error}</span>}
            <Tag {...input} {...props} className={className}/>
        </>
    )
});