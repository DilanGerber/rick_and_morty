const validation = (userData) => {
    const errors = {}
    if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userData.email)){
        errors.email = "El email ingresado no es valido"
    }
    if(!userData.email){
        errors.email = "Ingresa un email"
    }
    if(userData.email.length > 35){
        errors.email = "El email no debe superar 35 caracteres"
    }
    if(!/.*\d+.*/.test(userData.password)){
        errors.password = "La contraseña debe tener al menos un numero"
    }
    if(userData.password.length < 6 || userData.password.length > 10){
        errors.password = "La contraseña debe tener entre 6 a 10 caracteres"
    }
    return errors
}

export default validation