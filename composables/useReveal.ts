// Adds .is-visible to every .reveal element inside the given root when it scrolls into view.
export function useReveal(root: Ref<HTMLElement | null>) {
  onMounted(() => {
    if (!root.value) return
    const els = root.value.querySelectorAll('.reveal')
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target) }
      })
    }, { threshold: 0.15 })
    els.forEach((el) => io.observe(el))
    onBeforeUnmount(() => io.disconnect())
  })
}
