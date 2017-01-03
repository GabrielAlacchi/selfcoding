
import codeStore from './stores/CodeStore';

export function attachCssListener(styleId) {
  const styleTag = document.getElementById(styleId);
  codeStore.on('new_css_line', () => {
    styleTag.textContent = codeStore.getCssBody();
  });
}

export function attachMount(language, mountId) {
  const element = document.getElementById(mountId);
  if (element) {
    codeStore.on(`new_${language}_line`, () => {
      if (language === 'css') {
        element.textContent = codeStore.getCssBody();
      } else {
        element.innerHTML = codeStore.getHtmlBody();
      }
    });
  }
}
