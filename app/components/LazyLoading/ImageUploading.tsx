import React from 'react'

const ImageUploading = () => {
    return (
        <div className="relative h-32 w-full rounded-lg overflow-hidden bg-gray-50 border border-gray-100 shadow-sm">
            {/* Main shimmer effect */}
            <div className="absolute inset-0">
                <div className="w-full h-full skeleton-shimmer"></div>
            </div>

            {/* Central upload icon with pulsing effect */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/50 flex items-center justify-center skeleton-pulse">
                    <svg
                        className="w-6 h-6 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                    </svg>
                </div>
            </div>

            {/* Bottom progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1">
                <div className="h-full bg-blue-400/50 skeleton-progress"></div>
            </div>
        </div>
    )
}

export default ImageUploading