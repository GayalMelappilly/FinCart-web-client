import React from 'react'

type Props = {}

const PageHeader = (props: Props) => {
    return (
        <div className="flex mb-8 items-center">
            <div>
                <h2 className="text-2xl font-bold text-gray-800">Create Your Profile</h2>
                <p className="text-gray-500">Please provide your information to complete your profile</p>
            </div>
        </div>
    )
}

export default PageHeader