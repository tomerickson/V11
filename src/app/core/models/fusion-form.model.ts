export type FusionForm = {
  tableSet: string;
  resultLimit: number;
  mevLimit: number;
  orderBy: string;
  sortDescending: boolean;
  inputNeutrinos: boolean;
  outputNeutrinos: boolean;
  noNeutrinos: boolean;
  leftNuclides: {
    selectedElements: string[];
    nuclearSpin: string;
    atomicSpin: string;
  };
  rightNuclides: {
    selectedElements: string[];
    nuclearSpin: string;
    atomicSpin: string;
  };
  resultNuclides: {
    selectedElements: string[];
    nuclearSpin: string;
    atomicSpin: string;
  };
};