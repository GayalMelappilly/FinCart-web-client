import { ValidationErrors } from '@/app/seller/login/page'
import Link from 'next/link'
import React, { FC } from 'react'

type Props = {
    errors: ValidationErrors
}

const LoginHeader: FC<Props> = ({ errors }) => {
    return (
        <>
            <div>
                <h1 className="text-center text-2xl sm:text-3xl font-extrabold text-blue-800">Fincarts</h1>
                <h2 className="text-center text-2xl mt-4 sm:text-2xl font-extrabold text-gray-900">Sign in to your account</h2>
                <p className="mt-2 text-center text-xs sm:text-sm text-gray-600">
                    Or{' '}
                    <Link href="/seller/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                        create a new account
                    </Link>
                </p>
            </div>

            {errors.general && (
                <div className="bg-red-50 border-l-4 border-red-500 p-3 sm:p-4">
                    <div className="flex">
                        <div className="ml-2 sm:ml-3">
                            <p className="text-xs sm:text-sm text-red-700">{errors.general}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default LoginHeader