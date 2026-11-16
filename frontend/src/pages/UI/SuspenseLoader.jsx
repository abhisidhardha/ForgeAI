/** Shared Suspense fallback for lazy-loaded pages; API loading is handled inside each page. */
import { Suspense } from 'react'
import Loading from '../../components/Loading'


const SuspenseLoader = ({children}) => {
  return (
      <Suspense fallback={<Loading fullScreen />}>
          {children}
      </Suspense>
  )
}

export default SuspenseLoader
