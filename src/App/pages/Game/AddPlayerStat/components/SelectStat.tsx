import React from 'react';
import {
  SelectStatButton,
  StatCategoryItemsContainer,
  StatsCategoryContainer,
  StatsContainer,
} from './index';
import {GameRedux} from '../../../../../redux/redux.definitions';
import {colors} from '../../../../components/theme';
import {Headline4} from '../../../../components/Typography';
import {StatTextWithDot} from '../../components';
import {getCurrentStatCategoryOptions} from '../services';

interface Props {
  game: GameRedux;
  selectedStat: null | string;
  selectStat: (shorthand: string) => void;
}

const SelectPlayer: React.SFC<Props> = ({game, selectedStat, selectStat}) => {
  const statCategories = getCurrentStatCategoryOptions(
    game.stats,
    game.serveFirst
  );

  return (
    <StatsContainer>
      {statCategories.map(category => (
        <StatsCategoryContainer key={category.name}>
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
          <StatCategoryItemsContainer>
            {category.stats.map(({shorthand, name, result}) => (
              <SelectStatButton
                key={shorthand}
                selected={selectedStat === shorthand}
                onClick={() => {
                  selectStat(shorthand);
                }}
              >
                <StatTextWithDot text={name} status={result} />
              </SelectStatButton>
            ))}
          </StatCategoryItemsContainer>
        </StatsCategoryContainer>
      ))}
    </StatsContainer>
  );
};

export default SelectPlayer;
