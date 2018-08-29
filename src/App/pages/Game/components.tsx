import React from 'react';
import styled from 'react-emotion';
import {StatType, StatTypes} from '../../../redux/redux.definitions';
import {Paragraph3} from '../../components/Typography';

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
