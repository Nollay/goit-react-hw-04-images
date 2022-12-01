import axios from 'axios';

import React, { useState, useEffect } from 'react';
import { LoadMore } from './Button/Button';
import { Gallery } from './ImageGallery/ImageGallery';
import { GalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Loader } from './Loader/Loader';
import { ModalWindow } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import toast, { Toaster } from 'react-hot-toast';

export function App() {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loadMoreButton, setLoadMoreButton] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modalURL, setModalURL] = useState('');
  const [modalALT, setModalALT] = useState('');

  const getPhoto = async (searchQuery, page) => {
    return await axios
      .get('https://pixabay.com/api/', {
        params: {
          key: '29744257-c594c594fd182235a7d0b53c9',
          q: searchQuery,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          per_page: 12,
          page: page,
        },
      })
      .then(res => res.data);
  };
  // state = {
  //   images: [],
  //   searchQuery: '',
  //   page: 1,
  //   loadMoreButton: false,
  //   showModal: false,
  //   error: null,
  //   isLoading: false,
  //   modalURL: '',
  //   modalALT: '',
  // };
  // async componentDidUpdate(prevProps, prevState) {
  //   if (
  //     prevState.searchQuery !== this.state.searchQuery ||
  //     prevState.page !== this.state.page
  //   ) {
  //     try {
  //       this.setState({ isLoading: true });
  //       const response = await axios.get('https://pixabay.com/api/', {
  //         params: {
  //           key: '29947512-f3d06c4dc09f4cffc6828f6d0',
  //           q: this.state.searchQuery,
  //           image_type: 'photo',
  //           orientation: 'horizontal',
  //           safesearch: true,
  //           per_page: 12,
  //           page: this.state.page,
  //         },
  //       });
  //       this.setState(prevState => {
  //         return { images: [...prevState.images, ...response.data.hits] };
  //       });
  //       if (response.data.totalHits === 0) {
  //         toast.error('Nothing found.');
  //       }
  //       if (response.data.hits.length < 12) {
  //         this.setState({ loadMoreButton: false });
  //       } else {
  //         this.setState({ loadMoreButton: true });
  //       }
  //     } catch (error) {
  //       this.setState({ error: 'reloading the page' });
  //     } finally {
  //       setTimeout(() => {
  //         this.setState({ isLoading: falseee });
  //       }, '200');
  //     }
  //   }
  // }
  useEffect(() => {
    if (searchQuery !== '') {
      setIsLoading({ isLoading: true });
      getPhoto(searchQuery, page)
        .then(response => {
          if (response.totalHits === 0) {
            toast.error('Nothing found.');
          }
          setImages(prev => [...prev, ...response.hits]);

          if (page === response.total / 12 || response.hits < 12) {
            setLoadMoreButton(false);
          } else {
            setLoadMoreButton(true);
          }
        })
        .catch(error => {
          setError('reloading the page');
        })
        .finally(() => {
          setTimeout(() => {
            setIsLoading(false);
          }, 200);
        });
    }
  }, [page, searchQuery]);

  const handleSubmit = e => {
    e.preventDefault();
    setSearchQuery(e.target.elements.query.value);
    setPage(1);
    setImages([]);
    e.target.elements.query.value = '';
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const toggleModal = (tag, img) => {
    setShowModal(prev => !prev);
    setModalURL(img ?? '');
    setModalALT(tag ?? '');
  };

  return (
    <div>
      <Searchbar handleSubmit={handleSubmit} />
      {error && <div>{error}</div>}
      {isLoading && <Loader />}
      <Toaster position="top-right" reverseOrder={false} />
      <Gallery>
        <GalleryItem items={images} toggleModal={toggleModal} />
      </Gallery>
      {loadMoreButton && <LoadMore handleLoadMore={handleLoadMore} />}
      {showModal && (
        <ModalWindow onClose={toggleModal}>
          <img src={modalURL} alt={modalALT} />
        </ModalWindow>
      )}
    </div>
  );
}
