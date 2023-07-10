import { useState, useEffect } from "react";
import Notiflix from 'notiflix';
import fetchPixabay from "services/PixabayService";

import ImageGallery from "./ImageGallery/ImageGallery";
import SearchBar from "./SearchBar/SearchBar";
import Button from "./Button/Button";
import Loader from "./Loader/Loader";
import ErrorMessage from "./ErrorMessage/Error";
import Modal from "./Modal/Modal";
// import css from './app.css';

const App = () => {
  const [modal, setModal] = useState({isOpen: false, largeImageURL: ''});
  const [images, setImages] = useState([]);
  const [totalImages, setTotalImages] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {

    let prevSearchQuery = searchQuery;
    let prevCurrentPage = currentPage;

    if (searchQuery !== '' && searchQuery !== prevSearchQuery) {
      fetchImages(searchQuery, currentPage);
    } else if (currentPage !== prevCurrentPage) {
      fetchImages(searchQuery, currentPage);
    }
  

  }, [searchQuery, currentPage]);

// useEffect = (() => {
//     if(searchQuery !== searchQuery || currentPage !== currentPage) {
//         fetchImages(searchQuery, currentPage);
//       }
// }, [searchQuery, currentPage]);



//searchForm submit and setting query and page for the first search
const onSubmitSearch = (query) => {
    setSearchQuery(query);
    setImages([]);
    setCurrentPage(1);
    fetchImages(query, 1);
};


//uploading more pages upon current search
const onPageUpload = () => {
    setCurrentPage(prevPage => prevPage + 1)
    fetchImages(searchQuery, currentPage + 1);
  }
  
  const fetchImages = async(query, page) => {
      try {
        setLoading(true);
  
        const data = await fetchPixabay(query, page);
  
        if(data.totalHits === 0) {
          Notiflix.Notify.warning(`There is no results upon your ${query}, please try again...`);
          return;
        }
  
        setImages((prevState) => {
              return [...prevState, ...data.hits]
      })
  
      setTotalImages(data.totalHits)
  
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false)
      }
  }
  
  //work with modal
  const onModalOpen = (data) => {
    setModal( {
        isOpen: true,
        largeImageURL: data
      },
    );
  };
  
  const onModalClose = () => {
    setModal({
        isOpen: false,
        largeImageURL: ''
      },
    );
  }
  
      const showBtn = !loading && images.length !== totalImages;
     
      return (
        <div
          // style={{
          //   height: '100vh',
          //   display: 'flex',
          //   justifyContent: 'center',
          //   alignItems: 'center',
          //   fontSize: 40,
          //   color: '#010101'
          // }}
        >
      
          <SearchBar onSubmit={onSubmitSearch}/>   
          {loading && <Loader/> }    
          {images.length > 0 && <ImageGallery images={images} onModalOpen={onModalOpen}/> }
          {error && <ErrorMessage/>}
          
          {showBtn && <Button onPageUpload={onPageUpload}/>}
  
          {modal.isOpen && 
              <Modal 
                largeImageURL={modal.largeImageURL} 
                onModalClose={onModalClose} 
          />}
          
        </div>
      );
    };
  


export default App;
