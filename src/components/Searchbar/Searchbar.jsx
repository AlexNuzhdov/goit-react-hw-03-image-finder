import PropTypes from 'prop-types';
import { Component } from 'react';
import { SearchForm, SearchHeader, SearchFormInput, SearchFormButton } from './Searchbar.styled';
import {ReactComponent as AddSearch} from '../Icons/search 2 (1).svg'


export class SearchBar extends Component {
   
    state = {
      query: '',
    };

    // Наблюдает за инпутом и пишет значние в стейт
    handleChange = e => {
        this.setState({ query: e.currentTarget.value });
    };

    // Наблюдает за отправкой и отдает значение во внешний компонент
    handleSubmit = e => {
        e.preventDefault();
        // Запрещает отправку пустого инпута
        if (this.state.query === '') {
         
        }
        // Отдать данные внешнему компоненту
        this.props.onSubmit(this.state.query);
      
        this.reset();
      };
    
      reset = () => {
        this.setState({ query: '' });
      };
    
    render() {

      const { query } = this.state;
  
      return (

        <SearchHeader>
          <SearchForm onSubmit={this.handleSubmit}>
            <SearchFormButton type="submit">
              < AddSearch />
            </SearchFormButton>
  
            <SearchFormInput
              type="text"
              name="query"
              value={query}
              onChange={this.handleChange}
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </SearchForm>
          
        </SearchHeader>
      );
    }
  }

  SearchBar.propTypes = {
    onSubmit: PropTypes.func,
  };