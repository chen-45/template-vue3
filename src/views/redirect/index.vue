<script>
import { h } from '@vue/runtime-core'
import { useRoute, useRouter } from 'vue-router'
export default {

  setup () {
    const route = useRoute()
    const router = useRouter()
    const { params, query } = route
    const { path } = params
    router.replace({ path: '/' + path, query })
    return h(null)
  },
}
</script>
