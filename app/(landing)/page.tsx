import Image from 'next/image'
import { ShortenForm } from '@/components/index'

export default function Home() {
  return (
    <main >
      <h1 className='text-4xl text-slate-700 my-4 text-center'>
        paste the url to be shorten
      </h1>
      <ShortenForm />
    </main>
  )
}
