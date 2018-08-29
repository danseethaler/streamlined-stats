import store from '../../redux';

const download = (content, fileName, contentType) => {
  const a = document.createElement('a');
  const file = new Blob([content], {type: contentType});
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
};

export default () => {
  const state = store.getState();

  download(JSON.stringify(state), 'streamlined_stats.json', 'text/json');
};
