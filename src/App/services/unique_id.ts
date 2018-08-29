import store from '../../redux';

const s4 = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};

export const getUniqueId = () => {
  const {games} = store.getState();

  let id;
  do {
    id = s4();
  } while (id in games);

  return id;
};
