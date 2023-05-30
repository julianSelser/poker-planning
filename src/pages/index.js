import Image from 'next/image'
import { Inter } from 'next/font/google'
import Welcome from '@/components/Welcome/Welcome'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Welcome/>
  )
}
