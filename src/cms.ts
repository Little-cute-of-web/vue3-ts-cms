import * as ElementPlusIconsVue from '@element-plus/icons-vue';

export function install(app: any) {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }
}
