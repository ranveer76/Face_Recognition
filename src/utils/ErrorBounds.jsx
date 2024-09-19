import React from "react";
import { ErrorContext } from "../context/ErrorContext";

class ErrorBoundary extends React.Component {
  static contextType = ErrorContext;

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    const { setError } = this.context;
    if (setError) {
        setError({
            code: error.code,
            message: error.message,
            info: info.componentStack,
        });
    }
  }

  render() {
      if (this.state.hasError) {
          document.querySelector("#webpack-dev-server-client-overlay")?.remove();
          console.clear();
    }

    return this.props.children;
    }
    
}

export default ErrorBoundary;