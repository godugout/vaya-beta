
export interface ColorCombination {
  name: string;
  background: string;
  text: string;
  example: string;
}

export interface ColorSwatch {
  color: string;
  name: string;
  hex?: string;
  textClass?: string;
}

export interface ColorScale {
  name: string;
  colors: {
    [key: string]: string;
  };
}

export interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  label?: string;
}

export interface ContrastResult {
  combination: string;
  ratio: number;
  passesAA: boolean;
  passesAAA: boolean;
}
