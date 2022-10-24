import React from 'react';
import { SearchBar }  from '../Searchbar/Searchbar'
import{ImageGallery} from '../ImageGallery/ImageGallery'
import { fetchImages } from '../Api/Api'
import { Button } from '../Button/Button'
import { Container } from './App.styled'
import { Modal} from '../Modal/Modal'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Loader} from '../Loader/Loader'




export class App extends React.Component {

 state = {
  images: [],
  query: '',
  page:1,
  showModal: false,
  isLoading: false,
  largeImageURL: null,

 };



// Если при обновлении запрос не равен между стейтами, тогда делаем фетч
   componentDidUpdate(_,prevState) {

 if (prevState.page !== this.state.page || 
    prevState.query !== this.state.query
    ) {
      this.fetchImages();
    }
 
};


fetchImages = async () => {
  
    const { query, page } = this.state;
    const perPage = 12;

    this.setState({ isLoading: true });
    

    await fetchImages(query, page, perPage)
      .then(({ hits, totalHits }) => {
        const totalPages = Math.ceil(totalHits / perPage);

        if (hits.length === 0) {
          return toast.error('Sorry, no images found. Please, try again!');
        }

        if (page === 1) {
          toast.success(`Hooray! We found ${totalHits} images.`);
        }

        if (page === totalPages) {
          toast.info("You've reached the end of search results.");
        }

       this.setState(({ images }) => ({
          images: [...images, ...hits],
          // page: page + 1,
          total: totalHits,
        }));

      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  
};

// Принимаем с формы запрос и пишем в стейт + сбрасываем после отправки ключи из стейта
handleSearch = query => {
    if (query === this.state.query) return;
    this.setState({
      images: [],
      query,
      page: 1,
      error: null,
    });
  };

// Функция onloadMore
  onLoadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
      isLoading: true,
    }));
  };

  toggleModal = largeImageURL => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
    this.setState({ largeImageURL: largeImageURL });
  };

  
render() {

    const { isLoading, showModal, largeImageURL, tags, total, images,} =this.state;
    
    const loadImages = images.length !== 0;
    const isLastPage = images.length === total;
    const loadMoreBtn = loadImages && !isLoading && !isLastPage;

  return (
    <Container>
      <SearchBar onSubmit={this.handleSearch} />
      {isLoading && <Loader />}

     <ImageGallery images={this.state.images} onClick={this.toggleModal} />
     
      
      {loadMoreBtn && <Button onClick={this.onLoadMore}>Load more</Button>}

      {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt={tags} />
          </Modal>
        )}

      <ToastContainer theme="colored" position="top-right" autoClose={3000} />
      </Container>
  );
 }
}



