import React from 'react';
import styled from 'react-emotion';
import {
  StatType,
  StatTypes,
  UsOrOpponent,
} from '../../../../../redux/redux.definitions';
import {colors} from '../../../../components/theme';
import {Paragraph3} from '../../../../components/Typography';
import {getStatDefinition} from '../../../../services/stats/categories';
import {StatResultTypes} from '../../../../services/stats/stats.definitions';

export const StatListContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const StatContainerStyle = styled.div({
  display: 'flex',
  minWidth: '260px',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0.3em 0.6em',
  marginTop: '0.3em',
  backgroundColor: colors.xxLightCoolGray,
  borderRadius: 24,
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

const AdjustmentBox = ({adjustment}) => {
  if (!adjustment) {
    return null;
  }

  return (
    <span
      style={{
        color: colors.white,
        padding: '0px 3px',
        fontSize: '0.8em',
        backgroundColor: colors.extraLightGray,
        borderRadius: 3,
      }}
    >
      adj
    </span>
  );
};

const StatContainer = ({text, status, adjustment = false}) => (
  <StatContainerStyle>
    <StatTextWithDot text={text} status={status} />
    <AdjustmentBox adjustment={adjustment} />
  </StatContainerStyle>
);

export const StatItem = (stat: StatType) => {
  switch (stat.type) {
    case StatTypes.playerStat:
      return (
        <StatContainer
          status={getStatDefinition(stat.shorthand).result}
          text={`${stat.shorthand} - ${stat.player}`}
          adjustment={stat.adjustment}
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
};
