export interface IrFrame {
  frequency: number;
  pattern: number[];
}

export type IrProtocol = 'nec' | 'necx' | 'rc5' | 'rc6' | 'sirc12' | 'sirc15' | 'sirc20';

export interface IrCommand {
  protocol: IrProtocol;
  device: number;
  subdevice?: number;
  command: number;
}
