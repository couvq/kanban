import { useEffect, type RefObject } from "react"

const useClickOutside = (ref:  RefObject<unknown>, handler: (e?: MouseEvent) => void) => {
    useEffect(() => {
        const fireIfClickOutside = (e: MouseEvent) => {
            console.log('click outside fired')
           const outside = ref.current && !ref.current.contains(e.target as Node)
           if(outside) handler(e)
        }

        window.addEventListener('click', fireIfClickOutside)
        return () => window.removeEventListener('click', fireIfClickOutside)
    }, [ref, handler])
}

export default useClickOutside