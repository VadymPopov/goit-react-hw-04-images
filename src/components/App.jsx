import {useState, useEffect} from "react";
import { GlobalStyle } from "./GlobalStyles";
import { Layout } from "./Layout/Layout";
import GalleryList from './ImageGallery'
import SearchForm from "./SearchBar";
import ModalLightbox from "./Modal";
import LoadMoreBtn from "./Button";
import GallerySkeleton from "./GallerySkeleton/GallerySkeleton";
import ScrollUp from "./ScrollUp";
import { Toaster } from 'react-hot-toast';
import getImages from "services/api";

function App (){
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [value, setValue] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [largeImg, setLargeImg] = useState('');
  const [loadMore, setLoadMore] = useState(true);

  useEffect(()=>{

    if(value ===""){
      return
    };

    const fetchImg = async()=>{
      setIsLoading(true)

      try {
          const images =  await getImages(value.trim(), page);
          if(images.totalHits/12 < page){
            setLoadMore(false)
          }
          setImages(prevImages =>[...prevImages,...images.hits]);

          if (page > 1 ) {
            scrollOnLoadButton();
            setIsLoading(false);
          }

      } catch (error) {
        console.log({error})
      } finally {
        setIsLoading(false)
      }
  };

  fetchImg();

  }, [page, value])

    const handleGalleryItem = largeImgUrl => {
      setLargeImg(largeImgUrl);
      setIsOpenModal(true)
  };

    const handleLoad=()=> {
      setPage(prevPage=>(prevPage + 1));
      setIsLoading(true);
  };

    const closeModal=()=> {
      setIsOpenModal(false)
  };

    const onChangeQuery = value => {
      setImages([]);
      setPage(1);
      setValue(value);
      setLoadMore(true);
  };

   const scrollOnLoadButton = () => {
        window.scrollBy({
            top: document.body.scrollHeight,
            behavior: 'smooth',
    });
  };

    return(
        <Layout>
          <SearchForm  onSearch={onChangeQuery}/>

          <GalleryList images={images} onImageClick={handleGalleryItem} />
          {loadMore && images.length > 0 && <LoadMoreBtn onClick={handleLoad} />}

          {isOpenModal && <ModalLightbox onClose={closeModal}>
            <img src={largeImg} alt="modal-img"/>
          </ModalLightbox>}

          {isLoading && <GallerySkeleton/>}
          
          <ScrollUp/>
          <Toaster position='top-right' toastOptions={{
            duration:1500 
          }}/>
        <GlobalStyle/>
        </Layout>
    );
};

  export default App;