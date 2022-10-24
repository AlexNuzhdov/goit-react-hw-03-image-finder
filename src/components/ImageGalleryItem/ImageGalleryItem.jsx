import PropTypes from 'prop-types';
import {GaleryItem, GalleryItemImg} from './ImageGalleryItem.styled'

export const ImageGalleryItem = ({webformatURL, largeImageURL, tags, onClick}) => {

    return (
        
        <GaleryItem onClick = {() => {
            
                onClick(largeImageURL);
            }}>
        <GalleryItemImg src={webformatURL} alt={tags}/>
        </GaleryItem>
    )
};

ImageGalleryItem.propTypes = {
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };