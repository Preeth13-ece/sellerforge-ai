import { Component } from "react";

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("UI error boundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-screen flex-col items-center justify-center text-center px-6">
          <h1 className="font-display text-2xl font-semibold">Something broke on our end</h1>
          <p className="mt-2 text-ink-500">Please refresh the page. If this keeps happening, contact support.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
