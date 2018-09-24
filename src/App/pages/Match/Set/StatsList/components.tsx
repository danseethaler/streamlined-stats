import React from 'react';
import styled, {css} from 'react-emotion';
import {IoMdUndo} from 'react-icons/io';
import {
  StatType,
  StatTypes,
  UsOrOpponent,
} from '../../../../../redux/redux.definitions';
import {TRANSITION_ALL} from '../../../../components/constants';
import {colors} from '../../../../components/theme';
import {Paragraph2, Paragraph3} from '../../../../components/Typography';
import {getStatDefinition} from '../../../../services/stats/categories';
import {StatResultTypes} from '../../../../services/stats/stats.definitions';

export const StatListContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const reRecordContainer = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: TRANSITION_ALL,
  opacity: 0,
});

const StatContainer = styled.div({
  display: 'flex',
  width: 300,
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0.3em 0.3em 0.3em 0.7em',
  marginTop: '0.5em',
  backgroundColor: colors.xxLightCoolGray,
  borderRadius: 24,
  ':hover': {
    [`& .${reRecordContainer}`]: {
      opacity: 1,
    },
  },
});

const dotColors = {
  point: colors.affirmative,
  error: colors.negative,
  nill: colors.mediumCoolGray,
  alternative: colors.tertiary,
  noMatch: colors.purple,
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
    <Paragraph2>{text}</Paragraph2>
  </div>
);

const AdjustmentBox = styled.span({
  color: colors.gray,
  padding: '0px 3px',
  backgroundColor: colors.extraLightGray,
  borderRadius: 3,
});

const ReRecordStyle = css({
  backgroundColor: colors.extraLightCoolGray,
  borderRadius: '2em',
  padding: 4,
  cursor: 'pointer',
});

const ReRecord = () => (
  <IoMdUndo
    onClick={() => {
      console.log('here');
    }}
    size={32}
    color={colors.gray}
    className={ReRecordStyle}
  />
);

export const StatItem = (stat: StatType) => {
  switch (stat.type) {
    case StatTypes.playerStat:
      return (
        <StatContainer>
          <StatTextWithDot
            text={`${stat.shorthand} - ${stat.player}`}
            status={getStatDefinition(stat.shorthand).result}
          />
          {stat.adjustment && <AdjustmentBox>adj</AdjustmentBox>}
          <div className={reRecordContainer}>
            <ReRecord />
          </div>
        </StatContainer>
      );

    case StatTypes.timeout:
      return (
        <StatContainer>
          <StatTextWithDot
            text={`Timeout - ${stat.team}`}
            status="alternative"
          />
        </StatContainer>
      );

    case StatTypes.pointAdjustment:
      const text =
        stat.team === UsOrOpponent.us ? 'Opponent Error' : 'Untracked point';

      return (
        <StatContainer>
          <StatTextWithDot
            status={
              stat.team === 'us' ? StatResultTypes.point : StatResultTypes.error
            }
            text={text}
          />
        </StatContainer>
      );

    case StatTypes.noMatch:
      return (
        <StatContainer>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: 'calc(300px - 1em)',
              }}
            >
              <StatTextWithDot status="noMatch" text="No Match" />
              <div className={reRecordContainer}>
                <ReRecord />
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
                height: 140,
              }}
            >
              {stat.results.map(result => (
                <Paragraph3 key={result} style={{marginBottom: '0.3em'}}>
                  {result}
                </Paragraph3>
              ))}
            </div>
          </div>
        </StatContainer>
      );
  }
};
