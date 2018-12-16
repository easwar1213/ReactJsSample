export function setUserID(PLUserID) {
    return {
        type: "SAVE_USERID",
        payload: PLUserID
    }
}
export function setLang(PLanguage) {
    return {
        type: "SAVE_LANGUAGE",
        payload: PLanguage
    }
}

export function setPassword(PLPassword) {
    return {
        type: "SAVE_PASSWORD",
        payload: PLPassword
    }
}

export function setUserName(PUserName) {
    return {
        type: "SAVE_USERNAME",
        payload: PUserName
    }
}

export function setCCompanyID(PCCompanyID) {
    return {
        type: "SAVE_CCOMPANYID",
        payload: PCCompanyID
    }
}

export function setUTCStatus(PUTCStatus) {
    return {
        type: "SAVE_UTC_STATUS",
        payload: PUTCStatus
    }
}

export function setCompanyName(Company) {
    return {
        type: "SAVE_COMPANY",
        payload: Company
    }
}

export function setResidencyMove(isMoveResidency) {
    return {
        type: "SAVE_ISMOVE_RESIDENCY",
        payload: isMoveResidency
    }
}

export function setResidencyCountry(isMoveResidencyCountry) {
    return {
        type: "SAVE_RESIDENCY_COUNTRY",
        payload: isMoveResidencyCountry
    }
}

export function setCountryCode(isPensionProcessCountry) {
    return {
        type: "SAVE_PENSIONPROCESS_COUNTRY",
        payload: isPensionProcessCountry
    }
}
