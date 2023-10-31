import React, { useState } from "react";
import { imageDb } from './Config';
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

function FireBaseImageUpload({carpetaNom, setParentImgUrl}){
    const [img,setImg] =useState('')
    const [imgUrl,setImgUrl] =useState([])

    const handleClick = async () =>{
     if(img !==null){
        const imgRef =  ref(imageDb,`${carpetaNom}/${v4()}`)
        const value = await uploadBytes(imgRef,img);
        console.log(value)
        const url = await getDownloadURL(value.ref);
        setImgUrl(url)
        setParentImgUrl(url) // Aquí se actualiza el estado del componente padre

        // Fetch images after user clicks "Subir"
        // const imgs = await listAll(ref(imageDb,`${carpetaNom}`));
        // console.log(imgs)
        // const urls = await Promise.all(imgs.items.map(val => getDownloadURL(val)));
        // setImgUrl(urls);
     }
    }

    return(
        <div className="cmp-subir-foto">
                <input type="file" onChange={(e)=>setImg(e.target.files[0])} /> 
                <button onClick={handleClick}>Subir</button>
                <br/>
                {
                    imgUrl && <div>
                        <img src={imgUrl} height="200px" width="200px" />
                        <br/> 
                        <p>{imgUrl}</p>
                    </div>
                }
             
        </div>
    )
}
export default FireBaseImageUpload;