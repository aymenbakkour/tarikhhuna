
import { Era, Category } from './types';

export const ERAS: Era[] = [
  { id: 'all', name: 'كل الحقب' },
  { id: 'prophecy_early', name: 'عصر النبوة الأول' },
  { id: 'prophecy_mid', name: 'عصر الأنبياء العظام' },
  { id: 'jahiliyyah', name: 'فترة الجاهلية' },
  { id: 'rasulullah_khulafa', name: 'العصر النبوي والخلفاء الراشدين' },
  { id: 'islamic_dynasties', name: 'عصور الدولة الإسلامية' },
  { id: 'late_empires', name: 'عصر الإمبراطوريات المتأخرة' },
  { id: 'contemporary', name: 'التاريخ المعاصر' },
];

export const CATEGORIES: Record<Category['id'], Category> = {
  prophets: { id: 'prophets', name: 'الأنبياء والرسل', icon: '🕌', color: 'bg-teal-500', textColor: 'text-teal-500' },
  rulers: { id: 'rulers', name: 'الخلفاء والحكام', icon: '👑', color: 'bg-amber-500', textColor: 'text-amber-500' },
  scholars: { id: 'scholars', name: 'العلماء والفقهاء', icon: '🧠', color: 'bg-blue-500', textColor: 'text-blue-500' },
  companions: { id: 'companions', name: 'الصحابة والتابعين', icon: '🤝', color: 'bg-green-500', textColor: 'text-green-500' },
  influential_women: { id: 'influential_women', name: 'النساء المؤثرات', icon: '🚺', color: 'bg-pink-500', textColor: 'text-pink-500' },
  military_leaders: { id: 'military_leaders', name: 'القادة والعسكريون', icon: '⚔️', color: 'bg-red-500', textColor: 'text-red-500' },
  groups: { id: 'groups', name: 'الجماعات والتيارات', icon: '💡', color: 'bg-indigo-500', textColor: 'text-indigo-500' },
  reformers: { id: 'reformers', name: 'المصلحون والمفكرون', icon: '🖋️', color: 'bg-gray-500', textColor: 'text-gray-500' },
  literature: { id: 'literature', name: 'الأدباء والشعراء', icon: '📜', color: 'bg-purple-500', textColor: 'text-purple-500' },
  inventors: { id: 'inventors', name: 'المكتشفون والمخترعون', icon: '🔭', color: 'bg-cyan-500', textColor: 'text-cyan-500' },
  martyrs: { id: 'martyrs', name: 'الشهداء والمجاهدون', icon: '✨', color: 'bg-rose-500', textColor: 'text-rose-500' },
  sufis: { id: 'sufis', name: 'الزهاد والمتصوفة', icon: '💫', color: 'bg-lime-500', textColor: 'text-lime-500' },
};
