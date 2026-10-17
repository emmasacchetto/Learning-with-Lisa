import unit0 from './unit0.json';
import unit1 from './unit1.json';
import unit2 from './unit2.json';
import unit3 from './unit3.json';
import unit4 from './unit4.json';
import unit5 from './unit5.json';
import unit6 from './unit6.json';
import unit7 from './unit7.json';
import unit8 from './unit8.json';

export interface UnitData {
  unit: string;
  source: string;
  year?: string;
  DIALOGUES?: any[];
  GRAMMAR_QUIZZES?: any[];
  READING_COMPREHENSION?: any[];
  SENTENCES?: any[];
  VOCABULARY?: any[];
}

export const UNITS_DATA: UnitData[] = [
  unit0 as UnitData,
  unit1 as UnitData,
  unit2 as UnitData,
  unit3 as UnitData,
  unit4 as UnitData,
  unit5 as UnitData,
  unit6 as UnitData,
  unit7 as UnitData,
  unit8 as UnitData
];
