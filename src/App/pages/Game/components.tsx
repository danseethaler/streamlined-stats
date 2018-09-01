import React from 'react';
import styled from 'react-emotion';
import {SortableElement, SortableHandle} from 'react-sortable-hoc';
import {StatType, StatTypes} from '../../../redux/redux.definitions';
import {colors} from '../../components/theme';
import {Paragraph3} from '../../components/Typography';
import {
  getStatDefinition,
  StatResultTypes,
} from '../../services/stats/definitions';

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

const StatContainerStyle = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0.3em',
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
  marginRight: 6,
  borderRadius: 4,
  backgroundColor: dotColors[status] || dotColors.nill,
}));

const SortHandler = SortableHandle(
  styled.span({
    cursor: 'move',
    marginLeft: 24,
  })
);

const StatContainer = ({text, status}) => (
  <StatContainerStyle>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <StatusDot status={status} />
      <Paragraph3>{text}</Paragraph3>
    </div>
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
      return (
        <StatContainer
          status={
            stat.team === 'us' ? StatResultTypes.point : StatResultTypes.error
          }
          text={`Point Adjustment - ${stat.team}`}
        />
      );
  }
});
