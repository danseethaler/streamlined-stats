import React from 'react';
import styled from 'react-emotion';
import {StatType, StatTypes} from '../../../redux/redux.definitions';
import {Paragraph3} from '../../components/Typography';
import {colors} from '../../components/theme';

export const SelectRow = styled.div<{selected: boolean}>(({selected}) => ({
  backgroundColor: selected ? colors.darkCoolGray : colors.white,
  color: selected ? colors.white : colors.black,
  padding: '1em',
  cursor: 'pointer',
  ':hover': {
    backgroundColor: selected ? colors.darkCoolGray : colors.lightCoolGray,
  },
}));

export const StatButton = styled.div({
  padding: '0.5em',
  cursor: 'pointer',
  ':hover': {
    backgroundColor: colors.lightCoolGray,
  },
});

const StatContainer = styled.div({});

export const StatDisplay = (stat: StatType) => {
  switch (stat.type) {
    case StatTypes.playerStat:
      return (
        <StatContainer>
          <Paragraph3>
            {stat.shorthand} - {stat.player}
          </Paragraph3>
        </StatContainer>
      );

    case StatTypes.substitute:
      return (
        <StatContainer>
          <Paragraph3>
            {stat.subIn} in for {stat.subOut}
          </Paragraph3>
        </StatContainer>
      );

    case StatTypes.timeout:
      return (
        <StatContainer>
          <Paragraph3>{stat.type}</Paragraph3>
        </StatContainer>
      );
  }
};
