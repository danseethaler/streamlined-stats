export const enum StatShorthands {
  SP = 'SP', // Sets Played
  SA = 'SA', // Service Attempt
  A = 'A', // Ace
  SE = 'SE', // Serving Error
  PTS = 'PTS', // Rotation Points
  R1 = 'R1', // Receptions
  R2 = 'R2', // Receptions
  R3 = 'R3', // Receptions
  RE = 'RE', // Reception Errors
  BS = 'BS', // Solo Blocks
  BA = 'BA', // Assisted Blocks
  BE = 'BE', // Block Errors
  D = 'D', // Digs
  DE = 'DE', // Dig Errors
  BHA = 'BHA', // Ball Handling Attempt
  AST = 'AST', // Assists
  BHE = 'BHE', // Ball Handling Errors
  ATT = 'ATT', // Attack Attempts
  K = 'K', // Attack Kills
  E = 'E', // Attack Errors
}

export const enum StatCategoryActions {
  player = 'player',
  calculated = 'calculated',
}

export interface StatCategoryType {
  name: string;
  shorthand: StatShorthands;
  description: string;
  category:
    | 'General'
    | 'Serving'
    | 'Receiving'
    | 'Blocking'
    | 'Digs'
    | 'Ball Handling'
    | 'Attack';
  action: StatCategoryActions;
  raking?: boolean;
}

const stats: StatCategoryType[] = [
  {
    name: 'Sets Played',
    shorthand: StatShorthands.SP,
    description: 'Total number of sets played.',
    category: 'General',
    action: StatCategoryActions.calculated,
  },
  {
    name: 'Service Attempt',
    shorthand: StatShorthands.SA,
    description:
      'Total number of service attempts for the game (season). A service attempt is given any time a player attempts to serve the ball or when a player is given a Service Ace or Service Error. A service attempt should also be assigned to a player who - because they were out of rotation- did not serve, but should have served.',
    category: 'Serving',
    action: StatCategoryActions.player,
  },
  {
    name: 'Ace',
    shorthand: StatShorthands.A,
    description:
      'Total number of service aces during the game (season). A service ace is awarded when a serve results directly in a point. An ace is also awarded if the receiving team is out of rotation or commits a lift or carry on the first touch.',
    category: 'Serving',
    action: StatCategoryActions.player,
  },
  {
    name: 'Serving Error',
    shorthand: StatShorthands.SE,
    description:
      'Total number of service errors during the game (season). A service error is given when the serve lands out of bounds, does not go over the net, or hits the antennea. A service error is also given if the server commits a foot fault, takes too much time or serves out of rotation (given to the player who should have been serving).',
    category: 'Serving',
    action: StatCategoryActions.player,
  },
  {
    name: 'Rotation Points',
    shorthand: StatShorthands.PTS,
    description:
      "Total number of points scored by the team while this player was serving. This stat is used to measure a team's effectiveness in each rotation; however, it is not very insightful unless the rotation (line-up) remains consistent. A rotation point is awarded each time this player serves and the team wins the rally.",
    category: 'Serving',
    action: StatCategoryActions.calculated,
  },
  {
    name: 'Reception - 1',
    shorthand: StatShorthands.R1,
    description:
      'A service reception is awarded when a player continues play by successfully passing a served ball and the pass does not result in a kill (an overpass) or lead directly to a kill by a teammate (this would be an assist).',
    category: 'Receiving',
    action: StatCategoryActions.player,
  },
  {
    name: 'Reception - 2',
    shorthand: StatShorthands.R2,
    description:
      'A service reception is awarded when a player continues play by successfully passing a served ball and the pass does not result in a kill (an overpass) or lead directly to a kill by a teammate (this would be an assist).',
    category: 'Receiving',
    action: StatCategoryActions.player,
  },
  {
    name: 'Reception - 3',
    shorthand: StatShorthands.R3,
    description:
      'A service reception is awarded when a player continues play by successfully passing a served ball and the pass does not result in a kill (an overpass) or lead directly to a kill by a teammate (this would be an assist).',
    category: 'Receiving',
    action: StatCategoryActions.player,
  },
  {
    name: 'Reception Error',
    shorthand: StatShorthands.RE,
    description:
      "A service reception error is given to a player when the serve hits the floor in the area of the player or if the player passes the serve but it cannot be kept in play by a teammate. A service reception error is also given if the player lifts or carries the served ball on the receiving team's first contact.",
    category: 'Receiving',
    action: StatCategoryActions.player,
  },
  {
    name: 'Solo Block',
    shorthand: StatShorthands.BS,
    description:
      'Total number of solo blocks during the game (season). A solo block is awarded a single player blocks the ball into the opposing team\'s court leading directly to a point. The blocker must be the only blocker attempting to block the ball. Simply making ball contact that does not result directly in a point during a block attempt should NOT be recorded as any kind of block. This is commonly referred to as a "touch" and is not currently tracked by MaxPreps.',
    category: 'Blocking',
    action: StatCategoryActions.player,
  },
  {
    name: 'Assisted Block',
    shorthand: StatShorthands.BA,
    description:
      'Total number of assisted blocks during the game (season). An assisted block is awarded when two or three players block the ball back into the opponent\'s court for a point. Each player attempting to block receives an assist even if it is obvious that only one player actually makes contact with the ball. Simply making ball contact that does not result directly in a point during a block attempt should NOT be recorded as any kind of block. This is commonly referred to as a "touch" and is not currently tracked by MaxPreps.',
    category: 'Blocking',
    action: StatCategoryActions.player,
  },
  {
    name: 'Block Error',
    shorthand: StatShorthands.BE,
    description:
      'Total number of blocking errors during the game (season). A blocking error is assigned when a one of the players attempting to block is called for a violation by the referee during a blocking attempt. Generally this occurs when the blocker commits a net violation, crosses the center line, reaches over the net, lift/carries the ball or attempts to block from the back row.',
    category: 'Blocking',
    action: StatCategoryActions.player,
  },
  {
    name: 'Dig',
    shorthand: StatShorthands.D,
    description:
      'Total number of digs during the game (season). A dig is awarded when the player passed the ball that has been attacked by the opposition. When an attack is blocked back into the attacker\'s court, a pass of the blocked ball is NOT considered a dig. Passing a "free ball" (ie- a ball played over the net by an opponent simply attempting to "keep the ball in play" - not score a point) should NOT be recorded as a "dig".',
    category: 'Digs',
    action: StatCategoryActions.player,
  },
  {
    name: 'Dig Error',
    shorthand: StatShorthands.DE,
    description:
      'Total number of dig errors during the game (season). A dig error is given when an attacked ball hits the floor within the area of the player or the player passes an attacked ball that cannot be controlled and returned to the opposing team.',
    category: 'Digs',
    action: StatCategoryActions.player,
  },
  {
    name: 'Ball Handling Attempt',
    shorthand: StatShorthands.BHA,
    description: 'The total number of ball handling attempts.',
    category: 'Ball Handling',
    action: StatCategoryActions.player,
  },
  {
    name: 'Assist',
    shorthand: StatShorthands.AST,
    description:
      'A player is awarded an assist whenever that player passes, sets or digs the ball to a teammate who attacks the ball for a kill.',
    category: 'Ball Handling',
    action: StatCategoryActions.player,
  },
  {
    name: 'Ball Handling Error',
    shorthand: StatShorthands.BHE,
    description:
      'A ball handling error is a call made by the referee that ends the play. Generally this is a double, lift, carry, etc.',
    category: 'Ball Handling',
    action: StatCategoryActions.player,
  },
  {
    name: 'Attack Attempt',
    shorthand: StatShorthands.ATT,
    description:
      'Total number of attack attempts during the game (season). An attack attempt is recorded any time a player attempts to attack the ball into the opponents court. The ball may be spiked, set, tipped or hit in the attempt.',
    category: 'Attack',
    action: StatCategoryActions.player,
  },
  {
    name: 'Attack Kill',
    shorthand: StatShorthands.K,
    description:
      'Total number of kills acquired during the game (season). A kill is awarded to a player any time an attack is unreturnable by the opposing team and is a direct cause of the opposing team not returning the ball. A kill is also awarded to the attacker any time the opposing team commits a blocking error. Any time a kill is awarded, an attack attempt must also be awarded.',
    category: 'Attack',
    action: StatCategoryActions.player,
  },
  {
    name: 'Attack Error',
    shorthand: StatShorthands.E,
    description:
      'Total number of attack errors during the game (season). An attack error is given any time a player hits the ball out of bounds, into the antennea or into the net. An attack that is blocked and not returned by the attacking team is also an attack error. An attack error is also given if the player commits a net foul, center line violation, lift, carry, or backrow attack. An attack attempt must be given everytime an attack error is recorded.',
    category: 'Attack',
    action: StatCategoryActions.player,
  },
];

export default stats;
