import React, { useState, useEffect, useCallback } from "react";
import { Skeleton, type SkeletonProps } from "../Skeleton";

interface Props {
  children: React.ReactNode;
  fallBackComponent: React.ReactNode;
  resetCondition?: any;
  error?: boolean;
  isLoader?: boolean;
  loadingComponent?: React.ReactNode;
  skeleton?: SkeletonProps;
}

export const ErrorBoundary = ({
  children,
  fallBackComponent,
  resetCondition,
  error,
  isLoader,
  loadingComponent,
  skeleton,
}: Props) => {
  const [hasError, setHasError] = useState(false);
  const [prevResetCondition, setPrevResetCondition] = useState(resetCondition);

  const handleResetCondition = useCallback(() => {
    if (resetCondition !== prevResetCondition) {
      setHasError(false);
      setPrevResetCondition(resetCondition);
    }
  }, [resetCondition, prevResetCondition]);

  useEffect(() => {
    handleResetCondition();
  }, [handleResetCondition]);

  const errorHandler = useCallback(() => {
    setHasError(true);
  }, []);

  if (hasError || error) {
    return <>{fallBackComponent}</>;
  }

  return (
    <ErrorCatcher onError={errorHandler}>
      {isLoader ? (
        loadingComponent ? (
          loadingComponent
        ) : (
          <Skeleton shape="rectangle" height="2rem" {...skeleton} />
        )
      ) : (
        children
      )}
    </ErrorCatcher>
  );
};

//* Utility component to simulate `componentDidCatch` in functional components
interface ErrorCatcherProps {
  children: React.ReactNode;
  onError: () => void;
}

const ErrorCatcher = ({ children, onError }: ErrorCatcherProps) => {
  try {
    return <>{children}</>;
  } catch (e) {
    onError();
    return null;
  }
};
