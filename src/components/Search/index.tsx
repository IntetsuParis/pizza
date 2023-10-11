import React, { useRef, useState, useCallback } from 'react';

import styles from './Search.module.scss';

import { setSearchValue } from '../../redux/slices/filterSlice';

import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';

const Search: React.FC = () => {
  const dispatch = useDispatch();

  const [value, setValue] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current?.focus();
  };

  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 250),
    [],
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        height="16"
        viewBox="0 0 16 16"
        width="16"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M9.61752431,11.0317379 C8.73148308,11.642436 7.65749832,12 6.5,12 C3.46243388,12 1,9.53756612 1,6.5 C1,3.46243388 3.46243388,1 6.5,1 C9.53756612,1 12,3.46243388 12,6.5 C12,7.65749832 11.642436,8.73148308 11.0317379,9.61752431 L14.7071068,13.2928932 L13.2928932,14.7071068 L9.61752431,11.0317379 Z M6.5,10 C8.43299662,10 10,8.43299662 10,6.5 C10,4.56700338 8.43299662,3 6.5,3 C4.56700338,3 3,4.56700338 3,6.5 C3,8.43299662 4.56700338,10 6.5,10 Z"
          fillRule="evenodd"
        />
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Поиск пиццы.."
      />
      {value && (
        <svg
          onClick={onClickClear}
          className={styles.clearIcon}
          fill="none"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
            fill="currentColor"
          />
        </svg>
      )}
    </div>
  );
};

export default Search;
