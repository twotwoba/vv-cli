import { FC, ReactNode } from 'react'

const UnexpectedError: FC<{ icon?: ReactNode; errorMsg: string }> = ({ errorMsg, icon }) => (
    <div className="flex h-full flex-col items-center justify-center bg-gray-200">
        <p className="text-6xl font-bold py-10"> Oops!</p>
        <div className="py-6">
            {icon ? (
                <>{icon}</>
            ) : (
                <p className="py-10 text-4xl text-gray-800">Sorry, an unexpected error has occurred.</p>
            )}
        </div>
        <p className="text-2xl text-gray-500 italic">{errorMsg}</p>
    </div>
)

export default UnexpectedError
