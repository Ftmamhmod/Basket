import React from "react";
import { FaPhoneVolume } from "react-icons/fa6";
import { BsEnvelope } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";

export default function Contact()
{
    return(
        <>
            <div className="">
                <div className=" lg:px-[150px] sm:max-w-[90%] md:max-w-[100%]  m-auto ">
                    <Text header={"Get In Touch"} paragraph={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, ut maxime corrupti dolores ex rerum iste ipsam soluta quis dolorum doloribus"} >
                    </Text>

                    <Boxs/>

                    <Body/>
                </div>
            </div>
        </>
    )
}
function Text({header,paragraph})
{
    return(
        <>
            <div className="max-lg:px-[20px]">
                <h1 className="font-[400] md:text-[40px]   leading-[48px] text-center text-[30px]">{header}</h1>
                <p className={`mb-[30px]   text-center m-auto md:mb-[60px]  max-w-[95%] md:max-w-[60%] lg:max-w-[50%] max-sm:text-[12px]`}>{paragraph}</p>
            </div>
        </>
    )
}
function Boxs()
{
    return(
        <>
            <div className="my-[30px] flex md:flex-row flex-wrap gap-[28px] lg:max-w-[80%] md:max-w-[90%] m-auto">
                <Box iconname={<FaLocationDot className="text-[#35AFA0] text-[20px]" />} address={"102 Street 2714 Donovan"} text={"Lorem ipsum dolar site amet discont"}/>
                <Box iconname={<FaPhoneVolume className="text-[#35AFA0] text-[20px]" />} address={"+02 1234 567 88"} text={"Lorem ipsum dolar site amet discont"}/>
                <Box iconname={<BsEnvelope className="text-[#35AFA0] text-[30px]"/>} address={"info@example.com"} text={"Lorem ipsum dolar site amet discont"} />
            </div>
        </>
    )
}
function Box({iconname,address,text})
{
    return(
        <>
            <div className="rounded-[8px] w-full md:flex-[30%] py-[25px] flex items-center justify-center flex-col  gap-[10px] bg-[#eee] max-w-[85%]  m-auto ">
                <span>{iconname}</span>
                <p className="text-center">{address}</p>
                <p className="text-center">{text}</p>
            </div>
        </>
    )
}
function Body()
{
    return(
        <>
            <div className="shadow-[0_0_20px_0_rgba(0,0,0,0.1)] md:p-[50px] rounded-2xl my-[50px]  md:max-w-[90%] lg:max-w-[80%] max-w-[85%] m-auto">
                <Text header={"Send Us"} paragraph={"Contact us for all your questions and opinions, or you can solve your problems in a shorter time with our contact ffices."}/>
                <Inputs/>
            </div>

        </>
    )
}
function Inputs()
{
    return(
        <>
            <div className="  px-[30px] md:px-0 pb-[50px] md:flex md:gap-x-[20px] gap-y-[20px] justify-between m-auto flex-wrap">
                <Input inputtyp={"text"} label={"Name"} width={45}/>
                <Input inputtyp={"email"} label={"Email*"} width={45}/>
                <Input inputtyp={"number"} label={"Phone number"} />
                <TextArea inputtyp={"Your message"}  />
                <button className="cursor-pointer px-[15px] md:px-[25px] py-[5px] text-white bg-[#35AFA0] rounded-[5px]">Send Message</button>
            </div>
        </>
    )
}
function Input({inputtyp,label,width=100})
{
    return(
        <>
            <div className={`flex flex-col w-full md:w-[${width}%]`}>
                <label id={label} className="block max-md:mb-[5px] mb-[7px]">{label}</label>
                <input type={inputtyp}  id={label} className="rounded-[5px] max-md:mb-[15px] bg-[#F3F4F7] w-full p-[8px] border-none outline-none  md:full"/>
            </div>
        </>
    )
}
function TextArea({inputtyp})
{
    return(
        <>
            <div className={`flex flex-col w-full `}>
            <label className="block max-md:mb-[5px] mb-[7px]">{inputtyp}</label>
            <textarea rows={4} className=" resize-none scrollbar-none overflow-y-auto rounded-[5px] max-md:mb-[15px] bg-[#F3F4F7] w-full p-[8px] border-none outline-none  md:full"/>
            </div>
        </>
)}