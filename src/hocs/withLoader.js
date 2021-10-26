import React, {useState} from 'react';
import {ViewWithLoader} from '../components';

export function withLoader(WrappedComponent) {
  return props => {
    const [isLoading, setLoading] = useState(false);
    return (
      <ViewWithLoader isLoading={isLoading}>
        <WrappedComponent {...props} setLoading={setLoading} />
      </ViewWithLoader>
    );
  };
}
