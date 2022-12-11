import React, {useState} from 'react';
import {ViewWithProgress} from '../components/ViewWithProgress';

export function withProgress(WrappedComponent) {
  return props => {
    const [isShow, setShow] = useState(false);
    const [progress, setProgress] = useState(0);
    return (
      <ViewWithProgress isShow={isShow} progress={progress}>
        <WrappedComponent
          {...props}
          setShowProgress={setShow}
          setProgress={setProgress}
        />
      </ViewWithProgress>
    );
  };
}
