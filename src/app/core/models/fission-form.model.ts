export type FissionForm = {
  tableSet: string;
  resultLimit: number;
  mevLimit: number;
    orderBy: string;
  sortDescending: boolean;
  inputNeutrinos: boolean;
  outputNeutrinos: boolean;
  noNeutrinos: boolean;
  nuclides: {
    selectedElements: string[];
    nuclearSpin: string;
    atomicSpin: string;
  };
  output1: {
    selectedElements: string[];
    nuclearSpin: string;
    atomicSpin: string;
  };
  output2: {
    selectedElements: string[];
    nuclearSpin: string;
    atomicSpin: string;
  };
};
