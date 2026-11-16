import { forwardRef,useId  } from "react"

const Input = forwardRef( ({label , error  , ...props } , ref) => {
  const id = useId();
  return (
    <div className="flex flex-col gap-2 group">
        {label && (
            <label htmlFor={id} className="">{label}</label>
        )}
        <input id={id} ref={ref} className={`border-card caret-foreground rounded-lg px-3 py-2 outline-none placeholder:opacity-0 focus:placeholder:opacity-100 focus:ring-2 focus:ring-white/60 focus:shadow-[0_0_10px_1px_rgba(255,255,255,0.35)]`} {...props}/>
        {error && <p className="text-red-500 text-lg mt-1">{error}</p>}
    </div>

  )
})

export default Input
