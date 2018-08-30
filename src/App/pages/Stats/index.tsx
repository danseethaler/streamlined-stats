import {map} from 'lodash';
import React from 'react';
import {GameRedux} from '../../../redux/redux.definitions';
import {buildStatsTable} from './services';
import {Table} from './components';

interface MatchStatsProps {
  games: GameRedux[];
}

class MatchStats extends React.Component<MatchStatsProps> {
  public render() {
    // const stats = buildStatsTable(this.props.games);
    return null;
    // return (
    //   <Table>
    //     <thead>
    //       <tr>
    //         <td />
    //         {[
    //           'SP',
    //           'SA',
    //           'A',
    //           'SE',
    //           'PTS',
    //           'ATT',
    //           'K',
    //           'E',
    //           'R1',
    //           'R2',
    //           'R3',
    //           'RE',
    //           'BS',
    //           'BA',
    //           'BE',
    //           'BHA',
    //           'AST',
    //           'BHE',
    //           'D',
    //           'DE',
    //         ].map(header => (
    //           <th key={header}>{header}</th>
    //         ))}
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {map(stats, (cells, player) => (
    //         <tr key={player}>
    //           <th>{player}</th>
    //           {map(cells, (value, shorthand) => (
    //             <td key={shorthand}>{value}</td>
    //           ))}
    //         </tr>
    //       ))}
    //     </tbody>
    //   </Table>
    // );
  }
}

export default MatchStats;
