import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { setUserName } from '../../slices/user';
import * as styles from './styles';

const Home = () => {
  const [username, setUsername] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(setUserName(username));
    setUsername('');
    navigate('/waiting');
  };

  return (
    <styles.StyledMain>
      <styles.StyledForm onSubmit={handleSubmit}>
        <styles.StyledLabel htmlFor="username">
          Username:
          <styles.StyledInput
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </styles.StyledLabel>
        <styles.StyledButton type="submit">Start!</styles.StyledButton>
      </styles.StyledForm>
    </styles.StyledMain>
  );
};

export default Home;
