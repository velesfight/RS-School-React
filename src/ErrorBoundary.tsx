import React, { Component, ErrorInfo } from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  errorMessage: string;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { errorMessage: '' };
  }
  static getDerivedStateFromError(error: Error): State {
    return { errorMessage: error.toString() };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(' ErrorBoundary обнаружил ошибку : ', error, errorInfo);
    this.setState({ errorMessage: error.toString() });
  }
  render() {
    if (this.state.errorMessage) {
      return <p> Что - то пошло не так. </p>;
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
