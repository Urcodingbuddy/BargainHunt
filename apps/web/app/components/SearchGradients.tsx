export default function SearchGradients() {
    return (
        <>
            <div className="absolute w-[90vw] sm:w-[70vw]  md:w-[60vw] lg:w-[40vw]   h-[60px] rounded-xl blur-[30px] opacity-40 overflow-hidden 
                        before:content-[''] before:absolute before:w-[999px] before:h-[999px] 
                        before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 
                        before:rotate-[60deg] before:bg-[conic-gradient(#000,#402fb5_5%,#000_38%,#000_50%,#cf30aa_60%,#000_87%)]
                        before:transition-transform before:duration-[4000ms] before:ease-in-out
                        group-hover:before:rotate-[420deg]
                        group-focus-within:before:rotate-[420deg]" />

            {/* Dark border background */}
            <div className="absolute w-[90vw] sm:w-[70vw]  md:w-[60vw] lg:w-[40vw]   h-[55px] rounded-xl overflow-hidden
                        before:content-[''] before:absolute before:w-[600px] before:h-[600px] 
                        before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 
                        before:rotate-[82deg] before:bg-[conic-gradient(transparent,#18116a,transparent_10%,transparent_50%,#6e1b60,transparent_60%)]
                        before:transition-transform before:duration-[4000ms] before:ease-in-out
                        group-hover:before:rotate-[442deg]
                        group-focus-within:before:rotate-[442deg]" />

            {/* White glow */}
            <div className="absolute w-[90vw] sm:w-[70vw]  md:w-[60vw] lg:w-[40vw]  h-[53px] rounded-lg blur-[2px] overflow-hidden
                        before:content-[''] before:absolute before:w-[600px] before:h-[600px] 
                        before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 
                        before:rotate-[83deg] before:brightness-[1.4]
                        before:bg-[conic-gradient(transparent_0%,#a099d8,transparent_8%,transparent_50%,#dfa2da,transparent_58%)]
                        before:transition-transform before:duration-[4000ms] before:ease-in-out
                        group-hover:before:rotate-[443deg]
                        group-focus-within:before:rotate-[443deg]" />

            {/* Border */}
            <div className="absolute w-[90vw] sm:w-[70vw]  md:w-[60vw] lg:w-[40vw]  h-[49px] rounded-lg blur-[0.5px] overflow-hidden
                        before:content-[''] before:absolute before:w-[600px] before:h-[600px] 
                        before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 
                        before:rotate-[70deg] before:brightness-[1.3]
                        before:bg-[conic-gradient(#1c191c,#402fb5_5%,#1c191c_14%,#1c191c_50%,#cf30aa_60%,#1c191c_64%)]
                        before:transition-transform before:duration-[4000ms] before:ease-in-out
                        group-hover:before:rotate-[430deg]
                        group-focus-within:before:rotate-[430deg]" />

        </>
    )
}
