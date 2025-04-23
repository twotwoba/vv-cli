import { ReactSVG } from 'react-svg'
import UnexpectedError from '@/components/upexpected-error'

const NotFound = () => <UnexpectedError icon={<ReactSVG src="src/assets/icons/404.svg" />} errorMsg="Not Found" />

export default NotFound
