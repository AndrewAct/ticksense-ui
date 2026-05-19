export function useTypewriter(text: string, speed = 38) {
  const displayed = ref('')
  const done = ref(false)
  const cursor = ref(true)

  onMounted(() => {
    let i = 0
    const type = setInterval(() => {
      displayed.value += text[i]
      i++
      if (i >= text.length) {
        clearInterval(type)
        done.value = true
      }
    }, speed)

    const blink = setInterval(() => {
      cursor.value = !cursor.value
    }, 530)

    onUnmounted(() => {
      clearInterval(type)
      clearInterval(blink)
    })
  })

  return { displayed, done, cursor }
}
