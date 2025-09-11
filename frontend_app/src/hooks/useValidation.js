import {useState} from 'react'

export const useValidation = (initialState) => {
    const [value, setValue] = useState(initialState)
    const [dirty, setDirty] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('Поле не должно быть пустым')

    function validateForm(name, value) {
      if(name === 'email') {
            setErrorMessage(validate(value, {isEmail: true, required: true}))
        } else if(name === 'password') {
            setErrorMessage(validate(value, {isPassword: true, required: true, minLenght: 8}))
        } else if(name === 'login') {
            setErrorMessage(validate(value, {isName: true, required: true}))
        } else if(name === 'checking') {
            setErrorMessage(validate(value, {isCheck: true, required: true}))
        }
    }

    const onBlur = (e) => {
        const nameTarget = e.target.name
        const newValue = nameTarget === 'checking' ? e.target.checked : e.target.value;
        setDirty(true)
        validateForm(nameTarget, newValue)
    }

    const onChange = (e) => {
        const nameTarget = e.target.name
        const newValue = nameTarget === 'checking' ? e.target.checked : e.target.value;
        setValue(newValue)
        validateForm(nameTarget, newValue)
    }

    const validate = (value, rules) => {
       if(!rules) {
        setError(false)
        return ''
       }

       if(rules.required && value.length === 0) {
        setError(true)
        return 'Поле не должно быть пустым'
       }

       if(rules.isEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        setError(true)
        return 'Указан некоректный email'
       }

       if(rules.isPassword && value.length < rules.minLenght) {
        setError(true)
        return `Длина пароля должна быть минимум ${rules.minLenght} ${rules.minLenght >= 5 ? 'символов' : 'символа'}`
       }
       
       if(rules.isName && /[А-Яа-я]/.test(value)) {
        setError(true)
        return 'Имя должно быть из английских букв'
       }

       if(rules.isComment && value.length < rules.minLenght) {
        setError(true)
        return `Комментарий должен содержать минимум ${rules.minLenght} символов`
       }

       if(rules.isCheck) {
        if(rules.required && !value) {
            setError(true)
             return 'Необходимо согласиться с условиями';
        }
        setError(false)
        return ''
       }
    }

    const reset = () => {
        setValue(initialState)
        setDirty(false)
        setError(false)
        setErrorMessage('Поле не должно быть пустым')
    }

    return {value, dirty, onChange, onBlur, error, errorMessage, reset}
}