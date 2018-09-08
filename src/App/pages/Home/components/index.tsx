import styled from 'react-emotion';
import {SortableElement, SortableHandle} from 'react-sortable-hoc';

export const PlayersContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

export const SortPlayer = SortableElement(
  styled.div<{sortIndex: number}>(({sortIndex}) => ({
    display: 'flex',
    justifyContent: 'space-between',
    zIndex: 10,
    opacity: sortIndex < 6 ? 1 : 0.5,
  }))
);

export const PlayerSortHandler = SortableHandle(
  styled.span({
    cursor: 'move',
    marginLeft: 24,
  })
);
