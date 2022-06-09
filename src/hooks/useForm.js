import { useState } from "react";


export const useForm = (initialForm = {}) => {

    const [inputValues, setInputValues] = useState(initialForm);

    const rest = (newFormValues = initialForm) => {
        setInputValues(newFormValues);
    }

    const handleInputChange = ({ target }) => {
        setInputValues({
            ...inputValues,
            [target.name] : target.value
        });   
    }

    return [
        inputValues,
        handleInputChange,
        rest
    ]

}