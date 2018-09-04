import React from 'react';
import {connect} from 'react-redux';
import {addStatAction} from '../../../../redux/actions/games';
import {
  GameRedux,
  PlayerStat,
  StatType,
  StatTypes,
} from '../../../../redux/redux.definitions';
import {colors} from '../../../components/theme';
import {Headline4} from '../../../components/Typography';
import {StatTextWithDot} from '../components';
import {
  AddStatContainer,
  SelectRow,
  SelectStatButton,
  StatCategoryItemsContainer,
  StatsCategoryContainer,
  StatsContainer,
} from './components';
import {getRelevantCategories} from './services';

interface AddPlayerStatProps {
  game: GameRedux;
  addPlayerStat: (game: string, stat: StatType) => void;
}

interface AddPlayerStatState {
  selectedPlayer: null | string;
  selectedStat: null | string;
}

const initialState = {
  selectedPlayer: null,
  selectedStat: null,
};

class AddPlayerStat extends React.Component<
  AddPlayerStatProps,
  AddPlayerStatState
> {
  public state = initialState;

  public render() {
    const {addPlayerStat, game} = this.props;

    return (
      <AddStatContainer>
        <StatsContainer>
          {getRelevantCategories().map(category => (
            <StatsCategoryContainer>
              <Headline4
                style={{
                  padding: '2px 0.5em',
                  backgroundColor: colors.extraLightCoolGray,
                  color: colors.darkCoolGray,
                  fontWeight: 400,
                }}
              >
                {category.name}
              </Headline4>
              <StatCategoryItemsContainer key={category.name}>
                {category.stats.map(({shorthand, name, result}) => (
                  <SelectStatButton
                    key={shorthand}
                    selected={this.state.selectedStat === shorthand}
                    onClick={() => {
                      if (this.state.selectedPlayer) {
                        const playerStat: PlayerStat = {
                          type: StatTypes.playerStat,
                          shorthand,
                          player: this.state.selectedPlayer,
                        };

                        addPlayerStat(game.id, playerStat);
                        this.setState(initialState);
                      } else {
                        if (this.state.selectedStat !== shorthand) {
                          this.setState({selectedStat: shorthand});
                        } else {
                          this.setState({selectedStat: null});
                        }
                      }
                    }}
                  >
                    <StatTextWithDot text={name} status={result} />
                  </SelectStatButton>
                ))}
              </StatCategoryItemsContainer>
            </StatsCategoryContainer>
          ))}
        </StatsContainer>
        <div>
          {game.rotation.map(player => (
            <SelectRow
              key={player}
              selected={this.state.selectedPlayer === player}
              onClick={() => {
                if (this.state.selectedStat) {
                  const playerStat: PlayerStat = {
                    type: StatTypes.playerStat,
                    shorthand: this.state.selectedStat,
                    player,
                  };

                  addPlayerStat(game.id, playerStat);
                  this.setState(initialState);
                } else {
                  if (this.state.selectedPlayer !== player) {
                    this.setState({selectedPlayer: player});
                  } else {
                    this.setState({selectedPlayer: null});
                  }
                }
              }}
            >
              {player}
            </SelectRow>
          ))}
        </div>
      </AddStatContainer>
    );
  }
}

export default connect(
  null,
  {addPlayerStat: addStatAction}
)(AddPlayerStat);
