import { HelpCircle } from 'lucide-react'
import React from 'react'

type Props = {}

const FAQ = (props: Props) => {
    return (
        <section className="mt-12 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <HelpCircle size={20} className="mr-2 text-blue-500" />
                Frequently Asked Questions
            </h2>

            <div className="space-y-4">
                <div>
                    <h3 className="font-medium text-gray-800 mb-1">How many should I keep together?</h3>
                    <p className="text-gray-600">Blue Neon Tetras are schooling fish and should be kept in groups of at least 6-8 individuals. They will be more comfortable and display better coloration in larger groups.</p>
                </div>

                <div>
                    <h3 className="font-medium text-gray-800 mb-1">What fish can I keep with Blue Neon Tetras?</h3>
                    <p className="text-gray-600">They do well with other peaceful community fish of similar size. Good tankmates include other tetras, rasboras, peaceful dwarf cichlids, corydoras catfish, and small gouramis.</p>
                </div>

                <div>
                    <h3 className="font-medium text-gray-800 mb-1">Do they need any special care?</h3>
                    <p className="text-gray-600">Blue Neon Tetras appreciate slightly acidic water and subdued lighting with some plant cover. Regular water changes and a varied diet will help keep them healthy and vibrant.</p>
                </div>
            </div>
        </section>
    )
}

export default FAQ