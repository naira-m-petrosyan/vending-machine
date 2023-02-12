const coins = [100, 50, 20, 10, 5];

const getTokenFromHeader = (headerValue) => {
    return headerValue.split(" ")[1];
}

const getChange = (remainingChange, changeArray, availableCoins) => {
    if (remainingChange === 0) {
        return [];
    }
    if(availableCoins.includes(remainingChange)){
        changeArray.push(remainingChange);
        return changeArray;
    }

    for(let i = 0; i < availableCoins.length; i++){
        if (availableCoins[i] < remainingChange) {
            changeArray.push(availableCoins[i]);
            return getChange(remainingChange - availableCoins[i], changeArray, availableCoins);
        }
    }
}

const validateIsEmpty = (value) => {
    return (!value || (value && !value.toString().replace(/\s/g, '').length));
}

module.exports = {
    coins,
    getTokenFromHeader,
    getChange,
    validateIsEmpty,
}