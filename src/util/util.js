import titleCase from 'title-case';

export const deleteAttr = () => {
  if (document.body.hasAttribute('data-raw')) {
    document.body.removeAttribute('data-raw');
    document.body.removeAttribute('data-config');
  }
}

export const deleteScript = () => {
  const script = document.getElementById('report-script');
  if (script) {
    script.remove();
  }
}

export const formatTitle = title => {
  const newTitle = title.replace('-', ' ');
  return titleCase(newTitle);
}

export const cleanUpDOM = () => {
  deleteScript();
  deleteAttr();
}
