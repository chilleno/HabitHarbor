import Image from 'next/image'

export default function Home() {
  return (
    <main>
      <div className="flex lg:flex-row md:flex-col sm:flex-col sm:h-screen lg:min-h-screen">
        <div className="bg-[red] lg:basis-2/6 sm:h-1/5 lg:min-h-screen">01</div>
        <div className="bg-[blue] lg:basis-4/6 sm:h-3/5  lg:min-h-screen">02</div>
        <div className="bg-[green] lg:basis-2/6 sm:h-1/5 lg:min-h-screen">03</div>
      </div> 
    </main>
  )
}
