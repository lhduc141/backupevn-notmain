import { serviceTypesMessages } from 'messages/service-types.messages';

export const SERVICE_TYPES_FORM_OPTIONS = [
  {
    groupLabel: serviceTypesMessages.requesterInfo,
    value: 'requesterInfo',
    options: [
      { label: serviceTypesMessages.requester, value: 'requester', checked: true },
      { label: serviceTypesMessages.address, value: 'address', checked: true },
      { label: serviceTypesMessages.area, value: 'area', checked: true },
      { label: serviceTypesMessages.isNewAddress, value: 'isNewAddress', checked: true },
      { label: serviceTypesMessages.contactPhone, value: 'contactPhone', checked: true },
      { label: serviceTypesMessages.receivingChannel, value: 'receivingChannel', checked: true },
      { label: serviceTypesMessages.cccdInformation, value: 'cccdInformation', checked: true }
    ]
  },
  {
    groupLabel: serviceTypesMessages.requestInfo,
    value: 'requestInfo',
    options: [
      { label: serviceTypesMessages.serviceType, value: 'serviceType', checked: true },
      { label: serviceTypesMessages.appointmentDate, value: 'appointmentDate', checked: true },
      { label: serviceTypesMessages.file, value: 'file', checked: true },
      { label: serviceTypesMessages.requestContent, value: 'requestContent', checked: true },
      { label: serviceTypesMessages.notRequestToSendSms, value: 'notRequestToSendSms', checked: true },
      { label: serviceTypesMessages.isCalledOut, value: 'isCalledOut', checked: true },
      { label: serviceTypesMessages.electricalStatus, value: 'electricalStatus' },
      { label: serviceTypesMessages.outageAt, value: 'outageAt' },
      { label: serviceTypesMessages.reason, value: 'reason' },
      { label: serviceTypesMessages.outageEntireArea, value: 'outageEntireArea' },
      { label: serviceTypesMessages.notUpdateOutageManagement, value: 'notUpdateOutageManagement' },
      { label: serviceTypesMessages.incidentAddress, value: 'incidentAddress' },
      { label: serviceTypesMessages.incidentArea, value: 'incidentArea' },
      { label: serviceTypesMessages.phaseNumber, value: 'phaseNumber' },
      { label: serviceTypesMessages.intendedUse, value: 'intendedUse' },
      { label: serviceTypesMessages.documentsCustomerNeedToPrepare, value: 'documentsCustomerNeedToPrepare' }
    ]
  }
];
