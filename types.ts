
export interface TimelineEvent {
  id: number;
  year: number;
  date: string;
  title: string;
  era: Era['id'];
  category: Category['id'];
  summary: string;
  details: string;
  keyPoints: string[];
}

export interface Era {
  id: 'all' | 'prophecy_early' | 'prophecy_mid' | 'jahiliyyah' | 'rasulullah_khulafa' | 'islamic_dynasties' | 'late_empires' | 'contemporary';
  name: string;
}

export interface Category {
  id: 'prophets' | 'rulers' | 'scholars' | 'companions' | 'influential_women' | 'military_leaders' | 'groups' | 'reformers' | 'literature' | 'inventors' | 'martyrs' | 'sufis';
  name: string;
  icon: string;
  color: string;
  textColor: string;
}
