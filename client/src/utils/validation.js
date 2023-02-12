export function validateIsEmpty(value) {
    return (!value || (value && !value.toString().replace(/\s/g, '').length));
}

export function validateEmail(email) {
    const emailRegexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return emailRegexp.test(email);
}

export function validatePassword(value) {
    return value.length < 6;
}

export function validatePasswordMatch(password, passwordRepeat) {
    return password !== passwordRepeat;
}