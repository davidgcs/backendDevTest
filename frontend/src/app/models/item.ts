export interface Item {
  id: string;
  brand: string;
  model: string;
  price: number;
  imgUrl?: string;
}

export interface ItemDetailModel {
  announced: string;
  audioJack: string;
  battery: string;
  bluetooth: string[];
  brand: string;
  chipset: string;
  colors: string[];
  cpu: string;
  dimentions: string;
  displayResolution: string;
  displaySize: string;
  displayType: string;
  edge: string;
  externalMemory: string;
  gprs: string;
  gps: string;
  gpu: string;
  id: string;
  imgUrl: string;
  internalMemory: string[];
  model: string;
  networkSpeed: string;
  networkTechnology: string;
  nfc?: string;
  options: {
    colors: { code: number; name: string }[];
    storages: { code: number; name: string }[];
  };
  os: string;
  price: string;
  primaryCamera: string[];
  radio: string;
  ram: string;
  secondaryCmera: string;
  sensors: string[];
  sim: string[];
  speaker: string;
  status: string;
  usb: string;
  weight: string;
  wlan: string[];
}

export interface CartItem {
  id: string;
  colorCode: number;
  storageCode: number;
}

export interface CartResponse {
  count: number;
}
