"use client";
import React, { ChangeEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

async function createUrl(url: string){
    const  res  = await fetch("http://localhost:3000/api/generate", {
        method: 'POST',
        body: JSON.stringify({url})
    })
    if(!res.ok){
        throw new Error("failed to fetch data!")
    }
    return res.json();
}

const ShortenForm = () => {
    const router = useRouter();

  const [error, setError] = useState<string | null>();
  const [inputUrl, setInputUrl] = useState<string | null>();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputUrl(e.target.value);
  };

  const handleOnSubmit = async (e: ChangeEvent<HTMLFormElement>)=> {
    e.preventDefault()
   
    if(inputUrl){
        const { data, statuscode, error } = await createUrl(inputUrl)

        if(statuscode===200){
            router.push(`/success?code=${data.code}`)
            setError(null);
        }else{
            setError(error.message);
        }
    }
  } 

  return (
    <form className="max-w-[600px] w-full flex justify-center my-4 mx-auto" onSubmit={handleOnSubmit}>
      <div className="flex flex-col w-full relative">
        <input
          type="text"
          placeholder="enter a url"
          className={`border border-solid p-4 rounded-l-lg w-full ${
            error && "border-rose-600"
          }`}
          onChange={handleOnChange}
          required
        />
        {error && (
          <div className="text-xs text-pink-600 my-2 absolute top-14 ">
            {error}
          </div>
        )}
      </div>

      <input
        type="submit"
        className="bg-sky-700 font-bold text-white p-4  rounded-r-lg cursor pointer"
        value="Shorten URL"
      />
    </form>
  );
};

export default ShortenForm;
