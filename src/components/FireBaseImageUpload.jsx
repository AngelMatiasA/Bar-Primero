import React, { useEffect, useState } from "react";
import { imageDb } from './Config';
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

function FireBaseImageUpload({carpetaNom}){
    const [img,setImg] =useState('')
    const [imgUrl,setImgUrl] =useState([])

    const handleClick = async () =>{
     if(img !==null){
        const imgRef =  ref(imageDb,`${carpetaNom}/${v4()}`)
        const value = await uploadBytes(imgRef,img);
        console.log(value)
        const url = await getDownloadURL(value.ref);
        setImgUrl(data=>[...data,url])
     }
    }

    useEffect(()=>{
        const fetchImages = async () => {
            const imgs = await listAll(ref(imageDb,`${carpetaNom}`));
            console.log(imgs)
            const urls = await Promise.all(imgs.items.map(val => getDownloadURL(val)));
            setImgUrl(urls);
        }
        fetchImages();
    },[])


    return(
        <div className="App">
                <input type="file" onChange={(e)=>setImg(e.target.files[0])} /> 
                <button onClick={handleClick}>Upload</button>
                <br/>
                {
                    imgUrl.map(dataVal=><div>
                        <img src={dataVal} height="200px" width="200px" />
                        <br/> 
                        <p>{dataVal}</p>
                    </div>)
                }
        </div>
    )
}
export default FireBaseImageUpload;