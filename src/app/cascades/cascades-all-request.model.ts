import { KeyValuePair } from '../core/models/key-value-pair.model';

export interface ICascadesAllRequestModel {
  table_set: string; //	"Original"
  max_nuclei: number; //	"100"
  max_loops: number; //	"3"
  max_reactor_temp: number; //	"2400"
  Melting_switch: string; //	"Core"
  Boiling_switch: string; //	"Include"
  min_MeV_F: number; //	"5"
  min_MeV_T: number; //	"5"
  Isotope_switch: string; //	"Include"
  LHL_threshold: number; //	"18"
  NF_switch: string; //	"Core"
  AF_switch: string; //	"Core"
  Dimer_switch: string; //	"Include"
  order_by_N: string; //	"order+by+Z,+A"
  order_by_R: string; //	"order+by+MeV+desc"
  query: string; //	"E1+=+'H'+and+(E2+=+'Ni')+"
  sql_tables: { left: string; right: string; none: string }; //	"left"	"none"	"right"
}

export class CascadesAllRequestModel implements ICascadesAllRequestModel {
  table_set!: string;
  max_nuclei!: number;
  max_loops!: number;
  max_reactor_temp!: number;
  Melting_switch!: string;
  Boiling_switch!: string;
  min_MeV_F!: number;
  min_MeV_T!: number;
  Isotope_switch!: string;
  LHL_threshold!: number;
  NF_switch!: string;
  AF_switch!: string;
  Dimer_switch!: string;
  order_by_N!: string
  order_by_R!: string;
  query!: string;
  sql_tables!: {
    left: string;
    right: string;
    none: string;
  };

  asKeyValuePairs = (): KeyValuePair[] => {
    const kvps: KeyValuePair[] = [];
    Object.entries(this).forEach(([key, values]) => {
      if (key === 'sql_tables') {
        for (let i = 0; i < values.length; i++) {
          const key = `sql_tables[]`;
          const value = values[i];
          kvps.push(new KeyValuePair({ key, value }));
        }
      } else {
        if (values === undefined) {
          values = '';
        }
        kvps.push(new KeyValuePair({ key, value: values }));
      }
    });
    return kvps;
  };
}
