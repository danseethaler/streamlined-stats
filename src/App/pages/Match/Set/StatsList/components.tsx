import React from 'react';
import styled, {css} from 'react-emotion';
import {IoIosMic, IoMdPlay} from 'react-icons/io';
import {connect} from 'react-redux';
import {
  removeStatAction,
  toggleStatFlagAction,
  updateStatAction,
} from '../../../../../redux/actions/sets';
import {StatTypes, UsOrOpponent} from '../../../../../redux/redux.definitions';
import {TRANSITION_ALL} from '../../../../components/constants';
import SpeechToText, {
  ListenerStatuses,
  listeningColors,
  SpeechToTextChildProps,
} from '../../../../components/SpeechToText';
import {VoiceCommandType} from '../../../../components/SpeechToText/commands';
import Spinner from '../../../../components/Spinner';
import {colors} from '../../../../components/theme';
import {Paragraph2, Paragraph3} from '../../../../components/Typography';
import {getStatDefinition} from '../../../../services/stats/categories';
import {StatResultTypes} from '../../../../services/stats/stats.definitions';

export const StatListContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'absolute',
  right: 0,
  top: 70,
  bottom: 0,
  height: 'calc(100vh - 70px)',
  overflowY: 'auto',
  overflowX: 'hidden',
});

const reRecordContainer = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  minWidth: 74,
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
  cursor: 'pointer',
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

const Timestamp = styled.span({
  color: colors.gray,
  padding: '0px 3px',
});

const AdjustmentBox = styled.span({
  color: colors.gray,
  padding: '0px 3px',
  backgroundColor: colors.extraLightGray,
  borderRadius: 3,
});

const ReRecordStyle = css({
  display: 'flex',
  backgroundColor: colors.extraLightCoolGray,
  borderRadius: '2em',
  padding: 5,
  marginLeft: 5,
  cursor: 'pointer',
});

const ReRecordBase = ({
  index,
  setId,
  updateStat,
  removeStat,
  toggleStatFlag,
  stat,
}) => (
  <div className={reRecordContainer}>
    {stat.audioUrl && (
      <IoMdPlay
        size={32}
        color={colors.gray}
        className={ReRecordStyle}
        onClick={() => {
          new Audio(stat.audioUrl).play();
        }}
      />
    )}
    <SpeechToText
      onCommand={command => {
        switch (command.type) {
          case VoiceCommandType.noMatch:
            return updateStat(setId, index, {
              ...stat,
              audioUrl: command.audioUrl,
            });

          case VoiceCommandType.adjustment:
            return toggleStatFlag(setId, index, 'adjustment');

          case VoiceCommandType.review:
            return toggleStatFlag(setId, index, 'review');

          case VoiceCommandType.remove:
            return removeStat(setId, index);

          default:
            return updateStat(setId, index, command);
        }
      }}
    >
      {({
        listenerStatus,
        startListening,
        stopListening,
      }: SpeechToTextChildProps) =>
        listenerStatus === ListenerStatuses.processing ? (
          <div className={ReRecordStyle}>
            <Spinner size={22} color={colors.affirmative} />
          </div>
        ) : (
          <IoIosMic
            onMouseDown={startListening}
            onMouseUp={stopListening}
            size={32}
            color={listeningColors[listenerStatus]}
            className={ReRecordStyle}
          />
        )
      }
    </SpeechToText>
  </div>
);

const ReRecord = connect(
  null,
  {
    updateStat: updateStatAction,
    removeStat: removeStatAction,
    toggleStatFlag: toggleStatFlagAction,
  }
)(ReRecordBase);

export const StatItem = ({
  index,
  setId,
  stat,
  showTimestamp = '',
  onClick = () => null,
}) => {
  const rightContent = showTimestamp ? (
    <Timestamp>{showTimestamp}</Timestamp>
  ) : (
    <ReRecord setId={setId} stat={stat} index={index} />
  );

  switch (stat.type) {
    case StatTypes.playerStat:
      return (
        <StatContainer onClick={onClick}>
          <StatTextWithDot
            text={`${stat.shorthand} - ${stat.player}`}
            status={getStatDefinition(stat.shorthand).result}
          />
          {stat.review && <AdjustmentBox>review</AdjustmentBox>}
          {stat.adjustment && <AdjustmentBox>adj</AdjustmentBox>}

          {rightContent}
        </StatContainer>
      );

    case StatTypes.timeout:
      return (
        <StatContainer>
          <StatTextWithDot
            text={`Timeout - ${stat.team}`}
            status="alternative"
          />
          {stat.review && <AdjustmentBox>review</AdjustmentBox>}
          {rightContent}
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
          {stat.review && <AdjustmentBox>review</AdjustmentBox>}
          {rightContent}
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
              {stat.review && <AdjustmentBox>review</AdjustmentBox>}
              {rightContent}
            </div>
            {!stat.audioUrl && (
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
            )}
          </div>
        </StatContainer>
      );
  }
};
