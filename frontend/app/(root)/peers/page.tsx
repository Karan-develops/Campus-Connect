import { Metadata } from 'next'
import PeersContent from './peers-content'

export const metadata: Metadata = {
  title: 'Peers | Campus Diary',
  description: 'Connect with your peers, find collaborators, and explore exciting projects at College Name.',
}

export default function PeersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Connect with Peers</h1>
      <PeersContent />
    </div>
  )
}
