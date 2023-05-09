export type MarginSize =
  | 2
  | 4
  | 8
  | 9
  | 10
  | 12
  | 16
  | 20
  | 22
  | 24
  | 28
  | 32
  | 36
  | 40
  | 42
  | 48
  | 56
  | 72
  | 80
  | 100
  | 200

export const MARGINS: Record<MarginSize, string> = {
  '2': '2px',
  '4': '4px',
  '8': '8px',
  '9': '9px',
  '10': '10px',
  '12': '12px',
  '16': '16px',
  '20': '20px',
  '22': '22px',
  '24': '24px',
  '28': '28px',
  '32': '32px',
  '36': '36px',
  '40': '40px',
  '42': '42px',
  '48': '48px',
  '56': '56px',
  '72': '72px',
  '80': '80px',
  '100': '100px',
  '200': '200px'
}
