export type CustomerPriceContract = {
    organizationUnitCode: string,
    meterPointCode: string,
    effectiveDate: string,
    indexSetType: string,
    numberOfHouseholds: 0,
    voltageLevelName: string,
    voltageLevelCode: string,
    quota: string,
    unitPrice: string
}[]
export type PostCustomerCode = {
    customerCode: string,
}
export type CustomerCodeCadastralCode = {
    customerCode: string,
    cadastralCode: string,
}
export type CustomerContactInfo = {
    organizationUnitCode: string,
    customerCode: string,
    signedDate: string,
    effectiveDate: string,
    effectiveFromDate: string,
    effectiveToDate: string
}