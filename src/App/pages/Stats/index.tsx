import {filter, map, remove} from 'lodash';
import React from 'react';
import {IoIosArrowBack} from 'react-icons/io';
import {GamesRedux} from '../../../redux/redux.definitions';
import ButtonNew from '../../components/ButtonNew';
import {buildStatsTable} from './services';

interface MatchStatsProps {
  games: GamesRedux;
}

interface MatchStatsState {
  selectedGames: string[];
  useMaxPreps: boolean;
}

class MatchStats extends React.Component<MatchStatsProps, MatchStatsState> {
  public state = {
    selectedGames: [],
    useMaxPreps: true,
  };

  public handleInputChange = ({target}) => {
    const {name} = target;

    let selectedGames;
    if (target.checked) {
      selectedGames = [...this.state.selectedGames, name];
    } else {
      selectedGames = remove(
        this.state.selectedGames,
        gameId => gameId !== name
      );
    }

    this.setState({selectedGames});
  };

  public render() {
    const selectedGames = filter(
      this.props.games,
      (game, gameId) => this.state.selectedGames.indexOf(gameId) >= 0
    );

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div>
          <ul>
            {map(this.props.games, (game, gameId) => (
              <li key={gameId}>
                <label>
                  <input
                    name={gameId}
                    onChange={this.handleInputChange}
                    type="checkbox"
                  />
                  {game.opponent} - {game.set}
                </label>
              </li>
            ))}
          </ul>
        </div>
        {buildStatsTable(selectedGames, this.state.useMaxPreps)}
        <ButtonNew
          icon={IoIosArrowBack}
          text="Toggle MaxPreps"
          onClick={() => {
            this.setState({useMaxPreps: !this.state.useMaxPreps});
          }}
        />
      </div>
    );
  }
}

export default MatchStats;
