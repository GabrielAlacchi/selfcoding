
import codeStore from './stores/CodeStore';

export function attachCssListener(styleId) {

  let styleTag = document.getElementById(styleId);
  codeStore.on('new_css_line', () => {

    styleTag.textContent = codeStore.getCssBody();

  });

}
