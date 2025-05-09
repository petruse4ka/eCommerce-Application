import type { BUTTON_TYPE, INPUT_TYPE } from './enums';

export interface ElementParameters {
  tag: string;
  className: string | string[];
  textContent?: string;
  callback?: (event: Event) => void;
  eventType?: string;
  attributes?: Record<string, string>;
}

export interface InputParameters extends ElementParameters {
  type: INPUT_TYPE;
  id: string;
  value?: string;
  placeholder?: string;
  readonly?: boolean;
  required?: boolean;
}

export interface ImageParameters extends ElementParameters {
  source: string;
  alt: string;
  width?: string;
  height?: string;
}

export interface LinkParameters extends ElementParameters {
  href: string;
  target: '_blank' | '_self';
}

export interface ButtonParameters extends ElementParameters {
  type: BUTTON_TYPE;
}

export interface InputComponent {
  placeholder: string;
  id: string;
  type: string;
  callback: () => void;
  labelText: string;
  isRequired?: boolean;
  value?: string;
}
