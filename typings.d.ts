// declare module '*.json' {
//   let json: any;
//   export = json;
// }

interface Player {
  number: string;
  name: string;
  year: string;
  positions: string[];
  height: string;
  captain?: boolean;
}

declare module '*/players.json' {
  let json: Player[];
  export = json;
}

interface Stat {
  name: string;
  shorthand: string;
  description: string;
  category:
    | 'General'
    | 'Serving'
    | 'Receiving'
    | 'Blocking'
    | 'Digs'
    | 'Ball Handling'
    | 'Attack';
  raking?: boolean;
}

declare module '*/stats.json' {
  let json: Stat[];
  export = json;
}
