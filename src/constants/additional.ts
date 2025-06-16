import returns from '@/assets/images/additional/cancelled.png';
import bicycle from '@/assets/images/additional/delivery-bicycle.png';
import letter from '@/assets/images/additional/letter.png';
import pickup2 from '@/assets/images/additional/pickup-secondary.png';
import type { additionalPagesData } from '@/types/interfaces';
import { LanguageSelector } from '@/utils/language-selector';

const languageSelector = LanguageSelector.getInstance();
const locale = languageSelector.translations;

export const DELIVERY: additionalPagesData = {
  TITLE: locale.additionalDeliveryTitle,
  CONTENT: [
    {
      type: 'text',
      content: locale.additionalDeliveryIntro,
    },
    { type: 'subtitle', content: locale.additionalDeliveryCourierTitle },
    {
      type: 'text',
      content: locale.additionalDeliveryCourierHours,
    },
    {
      type: 'text',
      content: locale.additionalDeliveryCourierPrice,
    },
    {
      type: 'text',
      content: locale.additionalDeliveryCourierFree,
    },
    { type: 'text', content: locale.additionalDeliveryCourierNotice },
    { type: 'subtitle', content: locale.additionalDeliveryPickupTitle },
    {
      type: 'text',
      content: locale.additionalDeliveryPickupInfo,
    },
    {
      type: 'text',
      content: locale.additionalDeliveryPickupTime,
    },
    { type: 'subtitle', content: locale.additionalDeliveryPaymentTitle },
    {
      type: 'text',
      content: locale.additionalDeliveryPaymentMethods,
    },
  ],
  IMAGE: bicycle,
};

export const TERMS: additionalPagesData = {
  TITLE: locale.additionalTermsTitle,
  CONTENT: [
    {
      type: 'text',
      content: locale.additionalTermsWarning,
    },
    {
      type: 'text',
      content: locale.additionalTermsIntro,
    },
    { type: 'subtitle', content: locale.additionalTermsSecurityTitle },
    {
      type: 'text',
      content: locale.additionalTermsSecurityContent,
    },
    {
      type: 'subtitle',
      content: locale.additionalTermsPrivacyTitle,
    },
    {
      type: 'text',
      content: locale.additionalTermsPrivacyContent,
    },
    {
      type: 'subtitle',
      content: locale.additionalTermsParentsTitle,
    },
    {
      type: 'text',
      content: locale.additionalTermsParentsContent,
    },
    { type: 'subtitle', content: locale.additionalTermsContactTitle },
    {
      type: 'text',
      content: locale.additionalTermsContactContent,
    },
  ],
  IMAGE: pickup2,
};

export const CONTACTS: additionalPagesData = {
  TITLE: locale.additionalContactsTitle,
  CONTENT: [
    {
      type: 'subtitle',
      content: locale.additionalContactsProductionTitle,
    },
    {
      type: 'text',
      content: locale.additionalContactsProductionAddress,
    },
    {
      type: 'subtitle',
      content: locale.additionalContactsPickupTitle,
    },
    {
      type: 'text',
      content: locale.additionalContactsPickupAddress1,
    },
    {
      type: 'text',
      content: locale.additionalContactsPickupAddress2,
    },
    {
      type: 'text',
      content: locale.additionalContactsPickupAddress3,
    },
    {
      type: 'subtitle',
      content: locale.additionalContactsPhonesTitle,
    },
    {
      type: 'text',
      content: locale.additionalContactsPhoneMain,
    },
    {
      type: 'text',
      content: locale.additionalContactsPhoneSupport,
    },
  ],
  IMAGE: letter,
};

export const RETURNS: additionalPagesData = {
  TITLE: locale.additionalReturnsTitle,
  CONTENT: [
    {
      type: 'text',
      content: locale.additionalReturnsCancelTime,
    },
    {
      type: 'text',
      content: locale.additionalReturnsQuality,
    },
  ],
  IMAGE: returns,
};
