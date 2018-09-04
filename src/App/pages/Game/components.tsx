import React from 'react';
import styled from 'react-emotion';
import {SortableElement, SortableHandle} from 'react-sortable-hoc';
import {
  StatType,
  StatTypes,
  UsOrOpponent,
} from '../../../redux/redux.definitions';
import {colors} from '../../components/theme';
import {Paragraph3} from '../../components/Typography';
import {
  getStatDefinition,
  StatResultTypes,
} from '../../services/stats/definitions';

export const StatButton = styled.div({
  padding: '0.5em',
  cursor: 'pointer',
  ':hover': {
    backgroundColor: colors.lightCoolGray,
  },
});

const StatContainerStyle = styled.div({
  display: 'flex',
  minWidth: '260px',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0.3em 0.6em',
  marginTop: '0.3em',
  backgroundColor: colors.xxLightCoolGray,
  borderRadius: '24px 0 0 24px',
});

const dotColors = {
  point: colors.affirmative,
  error: colors.negative,
  nill: colors.mediumCoolGray,
  alternative: colors.tertiary,
};

const StatusDot = styled.div<{status: string}>(({status}) => ({
  height: 8,
  width: 8,
  marginRight: 8,
  borderRadius: 4,
  backgroundColor: dotColors[status] || dotColors.nill,
}));

const SortHandler = SortableHandle(
  styled.span({
    cursor: 'move',
    marginLeft: 24,
  })
);

export const StatTextWithDot = ({text, status}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
    }}
  >
    <StatusDot status={status} />
    <Paragraph3>{text}</Paragraph3>
  </div>
);

const StatContainer = ({text, status}) => (
  <StatContainerStyle>
    <StatTextWithDot text={text} status={status} />
    <SortHandler>:::</SortHandler>
  </StatContainerStyle>
);

export const SortableStatItem = SortableElement((stat: StatType) => {
  switch (stat.type) {
    case StatTypes.playerStat:
      return (
        <StatContainer
          status={getStatDefinition(stat.shorthand).result}
          text={`${stat.shorthand} - ${stat.player}`}
        />
      );

    case StatTypes.substitute:
      return (
        <StatContainer
          status="alternative"
          text={`${stat.subIn} in for ${stat.subOut}`}
        />
      );

    case StatTypes.timeout:
      return (
        <StatContainer status="alternative" text={`Timeout - ${stat.team}`} />
      );

    case StatTypes.pointAdjustment:
      const text =
        stat.team === UsOrOpponent.us ? 'Opponent Error' : 'Untracked point';

      return (
        <StatContainer
          status={
            stat.team === 'us' ? StatResultTypes.point : StatResultTypes.error
          }
          text={text}
        />
      );
  }
});
