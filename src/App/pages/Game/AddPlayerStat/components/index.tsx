import React from 'react';
import styled from 'react-emotion';
import {IoIosCheckmark} from 'react-icons/io';
import {colors} from '../../../../components/theme';

export const AddHandlingContainer = styled.div({
  margin: '10px 0',
});

export const SelectPlayerContainer = styled.div<{swapped: boolean}>(
  ({swapped}) => ({
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '0.5em',
    ...(swapped
      ? {borderRight: '5px solid gray'}
      : {borderLeft: '5px solid gray'}),
  })
);

export const AddStatContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

export const StatsContainer = styled.div({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
});

export const StatsCategoryContainer = styled.div({
  border: '1px solid ' + colors.extraLightCoolGray,
  borderRadius: 4,
  marginBottom: '0.5em',
});

export const StatCategoryItemsContainer = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
});

export const SelectStatButton = styled.button<{selected: boolean}>(
  ({selected}) => ({
    backgroundColor: selected ? colors.darkCoolGray : colors.xxLightCoolGray,
    color: selected ? colors.white : colors.black,
    padding: '0.7em',
    border: 'none',
    borderRadius: '6px',
    margin: '0.5em',
    cursor: 'pointer',
    fontWeight: 300,
    flex: '1 0 20%',
    ':hover': {
      backgroundColor: selected ? colors.darkCoolGray : colors.lightCoolGray,
    },
  })
);

export const PlayersContainer = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  border: '1px solid #f5f5f5',
  borderRadius: 10,
});

export const PlayerRow = styled.div({
  display: 'flex',
  flex: '1 1 45%',
  alignItems: 'center',
  justifyContent: 'space-between',
  color: colors.darkCoolGray,
  padding: '0.8em 1em',
  cursor: 'pointer',
  fontWeight: 500,
  borderBottom: '1px solid #f5f5f5',
  ':first-child': {
    borderRadius: '10px 0 0 0',
  },
  ':nth-child(2)': {
    borderRadius: '0 10px 0 0',
  },
  ':nth-child(5)': {
    borderRadius: '0 0 0 10px',
  },
  ':last-child': {
    borderRadius: '0 0 10px 0',
  },
  ':hover': {
    backgroundColor: '#f5f5f5',
  },
});

export const PlayerImage = styled.img({
  height: '2em',
  width: '2em',
  borderRadius: '2em',
  marginLeft: 48,
  filter: 'brightness(120%)',
});

export const SelectedCircleContainer = styled.div<{active?: boolean}>(
  ({active}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '0.5em',
    height: '2em',
    width: '2em',
    border: '1px solid #f5f5f5',
    borderRadius: '2em',
    backgroundColor: active ? colors.primary : colors.white,
  })
);

export const SelectedCircle = ({selected}: {selected: boolean}) => {
  if (selected) {
    return (
      <SelectedCircleContainer active>
        <IoIosCheckmark color={colors.white} size={48} />
      </SelectedCircleContainer>
    );
  }
  return <SelectedCircleContainer />;
};
