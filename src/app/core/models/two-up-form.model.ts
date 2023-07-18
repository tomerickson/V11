export type TwoUpForm = {
    tableSet: string;
    resultLimit: number;
    mevLimit: number;
    orderBy: string;
    elementJoin: string;
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
    leftResults: {
      selectedElements: string[];
      nuclearSpin: string;
      atomicSpin: string;
    };
    rightResults: {
      selectedElements: string[];
      nuclearSpin: string;
      atomicSpin: string;
    };
  };
  