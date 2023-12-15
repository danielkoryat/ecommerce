import { useEffect } from "react";

//TODO add this all over the app
function useDocumentTitle(title) {
    useEffect(() => {
      document.title = title;
    }, [title]); 
  }