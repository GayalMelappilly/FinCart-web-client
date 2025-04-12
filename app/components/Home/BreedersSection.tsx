import { breeders } from '@/app/datasets/breeders'
import Link from 'next/link'
import React from 'react'

const BreedersSection = () => {
  return (
    <section className="container mx-auto px-4 py-12 mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Breeders</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {breeders.map((breeder) => (
            <Link href={`/breeder/${breeder.id}`} key={breeder.id} className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="h-40 overflow-hidden bg-gray-100 flex items-center justify-center p-4">
                  <div
                    className="w-full h-full bg-contain bg-center bg-no-repeat"
                    style={{ backgroundImage: `url('splash.png')` }}
                  ></div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-800">{breeder.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">{breeder.listingsCount}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
  )
}

export default BreedersSection