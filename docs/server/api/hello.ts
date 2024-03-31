import type { PhotoData } from '~/types/test'

async function fetchData(): Promise<PhotoData[]> {
  const res = await $fetch<PhotoData[]>('https://jsonplaceholder.typicode.com/albums/1/photos')
  return res
}

export default defineEventHandler(() => {
  return fetchData()
})
