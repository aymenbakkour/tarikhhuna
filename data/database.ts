import { TimelineEvent } from '../types';

// Import individual event files
import prophetMuhammadBirth from './events/jahiliyyah/prophets/1_prophet_muhammad_birth';
import alKhansaa from './events/jahiliyyah/literature/8_al_khansaa';
import prophetMuhammadMission from './events/rasulullah_khulafa/prophets/2_prophet_muhammad_mission';
import abuBakrCaliphate from './events/rasulullah_khulafa/rulers/3_abu_bakr_caliphate';
import fatimaAlZahraa from './events/rasulullah_khulafa/influential_women/4_fatima_al_zahraa';
import battleOfNahavand from './events/rasulullah_khulafa/military_leaders/5_battle_of_nahavand';
import harunAlRashid from './events/islamic_dynasties/rulers/6_harun_al_rashid';
import alKhwarizmi from './events/islamic_dynasties/scholars/7_al_khwarizmi';

// Assemble the allEvents array
export const allEvents: TimelineEvent[] = [
  prophetMuhammadBirth,
  prophetMuhammadMission,
  abuBakrCaliphate,
  fatimaAlZahraa,
  battleOfNahavand,
  harunAlRashid,
  alKhwarizmi,
  alKhansaa,
];
