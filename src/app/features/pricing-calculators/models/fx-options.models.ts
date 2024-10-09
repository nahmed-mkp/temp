export interface FxOptionForm {
    callType: {
        C: string,
        P: string,
      };
      optionTypes: {
        Barrier: {
          inputs: any[],
          outputs: any[],
        },
        Digital: {
          inputs: any[],
          outputs: any[],
        },
        Vanilla: {
          inputs: any[],
          outputs: any[],
        },
      };
      supportedCurrencies: string[];
}

export interface FxOptionOutput {
  underlying: string;
  asOfDate: string;
  optionType: string;
  callPut: string;
  maturity: string;
  strike: number;
  notional: number;
  notionalCurrency: string;
  quotedCurrency: string;
  barrier: number;
  upDown: string;
  inOut: string;
  inputDelta: number;
  inputVol: number;
  inputPrice: number;
}

export interface FxOptionRes {
  'underlying': string;
  'optionType': string;
  'callType': string;
  'maturity': string;
  'strike': number;
  'vol': number;
  'spot': number;
  'forward': number;
  'pct_otm': number;
  'intrinsic_value': 0;
  'break-even': number;
  'price': any;
  'premium': any;
  'delta': any;
  'delta01': any;
  'gamma01': any;
  'vega01': any;
  'theta1d': any;
}
