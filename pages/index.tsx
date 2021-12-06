import router from "next/router"
import Router from "next/router"
import { useEffect } from "react"

export default function Home() {
  useEffect(()=>{
    router.push('/make');
  },[])
  return (
    <>
      info 를 읽고 만드세요.
    </>
  )
}
