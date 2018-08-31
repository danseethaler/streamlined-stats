import React from 'react';

export default () => (
  <div>
    <h1>Girls Volleyball Stat Definitions</h1>

    <table className="pure-table pure-table-striped">
      <tbody>
        <tr>
          <th colSpan={3}>General</th>
        </tr>
        <tr>
          <td>Header</td>
          <td>Name</td>
          <td>Description</td>
        </tr>
        <tr>
          <td>SP</td>
          <td>Sets Played</td>
          <td>Total number of sets played. </td>
        </tr>
        <tr>
          <th colSpan={3}>Serving</th>
        </tr>
        <tr>
          <td>Header</td>
          <td>Name</td>
          <td>Description</td>
        </tr>
        <tr>
          <td>A/G</td>
          <td>Aces Per Game</td>
          <td>
            Aces / Games Played The average number of aces acquired during a
            game over the season.
          </td>
        </tr>
        <tr>
          <td>Ace %</td>
          <td>Aces/SA</td>
          <td>
            The ace percentage is the total aces divided by the total service
            attempts. Ace Percentage is only counted when/if serve attempts are
            recorded.
          </td>
        </tr>
        <tr>
          <td>SA</td>
          <td>Service Attempts</td>
          <td>
            Total number of service attempts for the game (season). A service
            attempt is given any time a player attempts to serve the ball or
            when a player is given a Service Ace or Service Error. A service
            attempt should also be assigned to a player who - because they were
            out of rotation- did not serve, but should have served.
          </td>
        </tr>
        <tr>
          <td>A</td>
          <td>Aces</td>
          <td>
            Total number of service aces during the game (season). A service ace
            is awarded when a serve results directly in a point. An ace is also
            awarded if the receiving team is out of rotation or commits a lift
            or carry on the first touch.
          </td>
        </tr>
        <tr>
          <td>SE</td>
          <td>Service Errors</td>
          <td>
            Total number of service errors during the game (season). A service
            error is given when the serve lands out of bounds, does not go over
            the net, or hits the antennea. A service error is also given if the
            server commits a foot fault, takes too much time or serves out of
            rotation (given to the player who should have been serving).
          </td>
        </tr>
        <tr>
          <td>PTS</td>
          <td>Rotation Points</td>
          <td>
            Total number of points scored by the team while this player was
            serving. This stat is used to measure a team's effectiveness in each
            rotation; however, it is not very insightful unless the rotation
            (line-up) remains consistent. A rotation point is awarded each time
            this player serves and the team wins the rally.
          </td>
        </tr>
        <tr>
          <td>A/S</td>
          <td>Aces Per Set</td>
          <td>The average number of aces per set. </td>
        </tr>
        <tr>
          <td>Serv %</td>
          <td>Serving Percentage</td>
          <td>Serving Percentage (A/SA = Serv %) </td>
        </tr>
        <tr>
          <th colSpan={3}>Attacking</th>
        </tr>
        <tr>
          <td>Header</td>
          <td>Name</td>
          <td>Description</td>
        </tr>
        <tr>
          <td> K/G</td>
          <td>Kills Per Game</td>
          <td>
            Kills / Games Played The average number of kills aquired during a
            game over the season.
          </td>
        </tr>
        <tr>
          <td> H%</td>
          <td>Hitting Percentage</td>
          <td>
            (Kills - Errors) / Attempts The hitting percentage is the total game
            (season) kills, less any hitting errors, divided by the total
            hitting attempts during the game (season).
          </td>
        </tr>
        <tr>
          <td> K%</td>
          <td>Kill Percentage</td>
          <td>
            Kills / Attempts The total kills divided by the total hitting
            attempts for the game (season).
          </td>
        </tr>
        <tr>
          <td>ATT</td>
          <td>Attack Attempts</td>
          <td>
            Total number of attack attempts during the game (season). An attack
            attempt is recorded any time a player attempts to attack the ball
            into the opponents court. The ball may be spiked, set, tipped or hit
            in the attempt.
          </td>
        </tr>
        <tr>
          <td>K</td>
          <td>Kills</td>
          <td>
            Total number of kills acquired during the game (season). A kill is
            awarded to a player any time an attack is unreturnable by the
            opposing team and is a direct cause of the opposing team not
            returning the ball. A kill is also awarded to the attacker any time
            the opposing team commits a blocking error. Any time a kill is
            awarded, an attack attempt must also be awarded.
          </td>
        </tr>
        <tr>
          <td>E</td>
          <td>Attack Errors</td>
          <td>
            Total number of attack errors during the game (season). An attack
            error is given any time a player hits the ball out of bounds, into
            the antennea or into the net. An attack that is blocked and not
            returned by the attacking team is also an attack error. An attack
            error is also given if the player commits a net foul, center line
            violation, lift, carry, or backrow attack. An attack attempt must be
            given everytime an attack error is recorded.
          </td>
        </tr>
        <tr>
          <td>K/S</td>
          <td>Kills Pert Set</td>
          <td>The average number of kills per set. </td>
        </tr>
        <tr>
          <th colSpan={3}>Serve Receiving</th>
        </tr>
        <tr>
          <td>Header</td>
          <td>Name</td>
          <td>Description</td>
        </tr>
        <tr>
          <td>SRG</td>
          <td>Serve Receptions / Games Played</td>
          <td>
            The average number of serve receptions successfully completed per
            game.
          </td>
        </tr>
        <tr>
          <td>R</td>
          <td>Service Reception</td>
          <td>
            A service reception is awarded when a player continues play by
            successfully passing a served ball and the pass does not result in a
            kill (an overpass) or lead directly to a kill by a teammate (this
            would be an assist).
          </td>
        </tr>
        <tr>
          <td>RE</td>
          <td>Service Reception Error</td>
          <td>
            A service reception error is given to a player when the serve hits
            the floor in the area of the player or if the player passes the
            serve but it cannot be kept in play by a teammate. A service
            reception error is also given if the player lifts or carries the
            served ball on the receiving team's first contact.
          </td>
        </tr>
        <tr>
          <td>R/S</td>
          <td>Receptions Per Sert</td>
          <td>The average number of receptions per set.</td>
        </tr>
        <tr>
          <td>R/M</td>
          <td>Receptions Per Match</td>
          <td>The average number of receptions per match. </td>
        </tr>
        <tr>
          <th colSpan={3}>Blocking</th>
        </tr>
        <tr>
          <td>Header</td>
          <td>Name</td>
          <td>Description</td>
        </tr>
        <tr>
          <td>B/G</td>
          <td>Blocks Per Game</td>
          <td>
            Total Blocks / Games Played The average number of blocks during a
            game throughout the season.
          </td>
        </tr>
        <tr>
          <td>B</td>
          <td>Total Blocks</td>
          <td>
            Solo Blocks + Assisted Blocks This number is automatically
            calculated when solo and assisted blocks are assigned - or it may be
            manually entered if the coach/statistician does not record solo and
            assisted blocks seperately.
          </td>
        </tr>
        <tr>
          <td>BS</td>
          <td>Block Solos</td>
          <td>
            Total number of solo blocks during the game (season). A solo block
            is awarded a single player blocks the ball into the opposing team's
            court leading directly to a point. The blocker must be the only
            blocker attempting to block the ball. Simply making ball contact
            that does not result directly in a point during a block attempt
            should NOT be recorded as any kind of block. This is commonly
            referred to as a "touch" and is not currently tracked by MaxPreps.
          </td>
        </tr>
        <tr>
          <td>BA</td>
          <td>Block Assists</td>
          <td>
            Total number of assisted blocks during the game (season). An
            assisted block is awarded when two or three players block the ball
            back into the opponent's court for a point. Each player attempting
            to block receives an assist even if it is obvious that only one
            player actually makes contact with the ball. Simply making ball
            contact that does not result directly in a point during a block
            attempt should NOT be recorded as any kind of block. This is
            commonly referred to as a "touch" and is not currently tracked by
            MaxPreps.
          </td>
        </tr>
        <tr>
          <td>BE</td>
          <td>Block Errors</td>
          <td>
            Total number of blocking errors during the game (season). A blocking
            error is assigned when a one of the players attempting to block is
            called for a violation by the referee during a blocking attempt.
            Generally this occurs when the blocker commits a net violation,
            crosses the center line, reaches over the net, lift/carries the ball
            or attempts to block from the back row.
          </td>
        </tr>
        <tr>
          <td>B/S</td>
          <td>Blocks Per Set</td>
          <td>The average number of blocks per set. </td>
        </tr>
        <tr>
          <th colSpan={3}>Ball Handling</th>
        </tr>
        <tr>
          <td>Header</td>
          <td>Name</td>
          <td>Description</td>
        </tr>
        <tr>
          <td>A/G</td>
          <td>Assists Per Game</td>
          <td>
            Assists / Games Played The average number of assists during a game
            throughout the season.
          </td>
        </tr>
        <tr>
          <td>BHA</td>
          <td>Ball Handling Attempts</td>
          <td>The total number of ball handling attempts.</td>
        </tr>
        <tr>
          <td>AST</td>
          <td>Assists</td>
          <td>
            A player is awarded an assist whenever that player passes, sets or
            digs the ball to a teammate who attacks the ball for a kill.
          </td>
        </tr>
        <tr>
          <td>BHE</td>
          <td>Ball Handling Errors</td>
          <td>
            A ball handling error is a call made by the referee that ends the
            play. Generally this is a double, lift, carry, etc.
          </td>
        </tr>
        <tr>
          <td>Ast/S</td>
          <td>Assists Per Set</td>
          <td>The average number of assists per set. </td>
        </tr>
        <tr>
          <th colSpan={3}>Digging</th>
        </tr>
        <tr>
          <td>Header</td>
          <td>Name</td>
          <td>Description</td>
        </tr>
        <tr>
          <td>D/G</td>
          <td>Digs Per Game</td>
          <td>
            Digs / Games Played The average number of digs during the game
            (season).
          </td>
        </tr>
        <tr>
          <td>D</td>
          <td>Digs</td>
          <td>
            Total number of digs during the game (season). A dig is awarded when
            the player passed the ball that has been attacked by the opposition.
            When an attack is blocked back into the attacker's court, a pass of
            the blocked ball is NOT considered a dig. Passing a "free ball" (ie-
            a ball played over the net by an opponent simply attempting to "keep
            the ball in play" - not score a point) should NOT be recorded as a
            "dig".
          </td>
        </tr>
        <tr>
          <td>DE</td>
          <td>Digging Errors</td>
          <td>
            Total number of dig errors during the game (season). A dig error is
            given when an attacked ball hits the floor within the area of the
            player or the player passes an attacked ball that cannot be
            controlled and returned to the opposing team.
          </td>
        </tr>
        <tr>
          <td>D/S</td>
          <td>Digs Per Set</td>
          <td>The average number of digs per set. </td>
        </tr>
      </tbody>
    </table>
  </div>
);
