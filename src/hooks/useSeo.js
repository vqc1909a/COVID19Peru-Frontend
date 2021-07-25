import { useEffect, useRef } from "react";
const useSeo = ({title, description}) => {
 const previousTitle = useRef(document.title);
 const previousTagTitle = useRef(document.querySelector("meta[name='title']"));
 const previousTagDescription = useRef(document.querySelector("meta[name='description']"));

 useEffect(() => {
  let metaTagTitle = document.querySelector("meta[name='title']");
  
  const prevTagTitle = previousTagTitle.current
  const prevTitle = previousTitle.current
  if(title){
   document.title = title;
   metaTagTitle.setAttribute("content", title)
  }

  return () => {
   document.title = prevTitle
   metaTagTitle.setAttribute("content", prevTagTitle.getAttribute("content"));
  };
 }, [title])

 useEffect(() => {
  const prevDescription = previousTagDescription.current
  let metaDescription = document.querySelector("meta[name='description']");

  if(description){
   metaDescription.setAttribute("content", description);
  }

  return () => metaDescription.setAttribute("content", prevDescription.getAttribute("content"));
 }, [description])

}

export default useSeo
