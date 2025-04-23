import viteLogo from '/vite.svg'
import { ReactSVG } from 'react-svg'

// import { RainbowButton } from './components/magicui/rainbow-button'
import { useCountStore } from '@/store/useCount'
import { Button } from './components/ui/button'

function App() {
    const { count, increment } = useCountStore()
    return (
        <>
            <div className="flex h-full w-full items-center justify-center">
                <div>
                    <div className="flex gap-2">
                        <div className="flex text-2xl font-bold text-blue-300">
                            <a href="https://vite.dev" target="_blank">
                                <img src={viteLogo} className="logo" alt="Vite logo" />
                            </a>
                            Hello Vite
                        </div>
                        <div className="flex text-2xl font-bold text-amber-500">
                            Hello World
                            <ReactSVG src="src/assets/icons/react.svg" className="logo react"></ReactSVG>
                        </div>
                    </div>

                    <br />
                    <div className="flex flex-col text-center">
                        count: {count} <br />
                        <Button onClick={increment}>Button</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
