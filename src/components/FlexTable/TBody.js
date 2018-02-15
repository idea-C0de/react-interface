import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
`;

const TBody = ({ children }) => (
  <Wrapper>
    {children}
  </Wrapper>
);

TBody.propTypes = {
  children: PropTypes.node
};

export default TBody;
