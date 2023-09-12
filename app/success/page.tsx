import { CopyBoard } from '@/components/index'

type successPage={
    searchParams: {
        code: string
    }
}

const SuccessPage = ({searchParams}:successPage) => {
    const { code } = searchParams

  return (
    <div>
      <h1 className='text-4xl text-slate-700 my-4 text-center'>
        Copy your shorten url
      </h1>
      <CopyBoard code={code}/>
    </div>
  )
}
export default SuccessPage
