
// Your existing imports
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css';
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css';
import '@quasar/extras/material-icons/material-icons.css';

// Import Quasar css
import 'quasar/src/css/index.sass'

import {
    defineCustomElement as _defineCustomElement,
    h,
    createApp,
    getCurrentInstance,
} from 'vue';
import { createPinia } from 'pinia';
import quasarIconSet from 'quasar/icon-set/material-icons';
import quasarLang from 'quasar/lang/fa-IR'
import { Quasar, Dialog, Notify } from 'quasar';
/**
 * Must be called after the getCurrentInstance() is saved into a variable
 */
function createVirtualApp() {
    const app = createApp();

    const pinia = createPinia();
    app.use(pinia);

    app.use(Quasar, {
        plugins: {
            Dialog,
            Notify,
        },
        iconSet: quasarIconSet,
        lang: quasarLang,
        config: {
        },
    });

    return app;
}

export function defineCustomElement(component) {
    return _defineCustomElement({
        shadowRoot: false,
        render: () => h(component),
        setup() {
            const vm = getCurrentInstance();

            if (!vm) {
                throw new Error('No current instance found');
            }

            const app = createVirtualApp();

            // Merge app context and provides
            Object.assign(vm.appContext, app._context);
            Object.assign(vm.provides, app._context.provides);
        },
    });
}