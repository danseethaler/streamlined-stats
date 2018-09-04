import styled from 'react-emotion';
import {colors} from '../../../components/theme';

export const AddStatContainer = styled.div({
  display: 'flex',
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

export const SelectRow = styled.div<{selected: boolean}>(({selected}) => ({
  backgroundColor: selected ? colors.darkCoolGray : colors.white,
  color: selected ? colors.white : colors.black,
  padding: '1em',
  cursor: 'pointer',
  ':hover': {
    backgroundColor: selected ? colors.darkCoolGray : colors.lightCoolGray,
  },
}));
