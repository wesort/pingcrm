import InertiaApp, { Inertia } from 'inertia-vue'
import PortalVue from 'portal-vue'
import Vue from 'vue'

Vue.config.productionTip = false
Vue.mixin({ methods: { route: (...args) => window.route(...args).url() } })
Vue.use(PortalVue)

Vue.mixin({
  methods: {
    $remember(data, key = null) {
      this.$on('hook:created', () => {
        this.$watch(() => data, newData => {
          Inertia.remember(newData, key)
        }, { immediate: true, deep: true })
      })

      return Inertia.restore(data, key)
    },
  }
})

let app = document.getElementById('app')

new Vue({
  render: h => h(InertiaApp, {
    props: {
      initialPage: JSON.parse(app.dataset.page),
      resolveComponent: (component) => {
        return import(`@/Pages/${component}`).then(module => module.default)
      },
    },
  }),
}).$mount(app)
