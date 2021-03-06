import store from '../../redux';

export const download = (content, fileName, contentType) => {
  const a = document.createElement('a');
  const file = new Blob([content], {type: contentType});
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
};

export default () => {
  const state = store.getState();

  download(JSON.stringify(state), 'spoken_stats.json', 'text/json');
};
