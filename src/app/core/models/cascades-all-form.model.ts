export interface ICascadesAllForm {
  tableSet: string;
  maxNuclei: number;
  maxLoops: number;
  maxReactorTemp: number;
  meltingSwitch: string;
  boilingSwitch: string;
  fusionMinEnergy: number;
  twoUpMinEnergy: number;
  isotopeSwitch: string;
  halfLifeThreshold: number;
  nuclearFermionSwitch: string;
  atomicFermionSwitch: string;
  dimersSwitch: string;
  nuclidesSort: string;
  reactionSort: string;
  coreQuery: string;
  leftElements: string;
  originalElements: string;
  rightElements: string;
  fusionQuery: string;
  fusionResults: string;
  twoUpQuery: string;
  twoUpResults: string;
  startingFuel: string;
  fusionTable: string;
  twoUpTable: string;
  progressMessageOne: string;
  progressMessageTwo: string;
  duration: number;
}

/* export class CascadesAllForm implements ICascadesAllForm {
  tableSet!: string;
  maxNuclei!: number;
  maxLoops!: number;
  maxReactorTemp!: number;
  meltingSwitch!: string;
  boilingSwitch!: string;
  fusionMinEnergy!: number;
  twoUpMinEnergy!: number;
  isotopeSwitch!: string;
  halfLifeThreshold!: number;
  nuclearFermionSwitch!: string;
  atomicFermionSwitch!: string;
  dimersSwitch!: string;
  nuclidesSort!: string;
  reactionSort!: string;
  coreQuery!: string;
  leftElements!: string;
  originalElements!: string;
  rightElements!: string;

} */
