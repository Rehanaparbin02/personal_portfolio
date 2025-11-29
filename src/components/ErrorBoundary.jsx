import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
        // Define a unique class name for cursor override
        this.cursorOverrideClass = 'error-state-native-cursor-show';
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
        this.setState({
            error,
            errorInfo
        });
    }

    // Helper to manage body class for cursor visibility
    toggleNativeCursor(shouldShow) {
        if (shouldShow) {
            document.body.classList.add(this.cursorOverrideClass);
        } else {
            document.body.classList.remove(this.cursorOverrideClass);
        }
    }

    // Lifecycle methods to handle cursor state
    componentDidMount() {
        if (this.state.hasError) {
            this.toggleNativeCursor(true);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.hasError && !prevState.hasError) {
            // Error just appeared
            this.toggleNativeCursor(true);
        } else if (!this.state.hasError && prevState.hasError) {
            // Error was resolved (rare, but good for cleanup)
            this.toggleNativeCursor(false);
        }
    }

    componentWillUnmount() {
        // Clean up body class on unmount
        this.toggleNativeCursor(false);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    padding: '50px',
                    textAlign: 'center',
                    fontFamily: "'Inter', sans-serif"
                }}>
                    <h1 style={{ color: '#1d2342', fontSize: '2rem', marginBottom: '1rem' }}>
                        Something went wrong
                    </h1>
                    <p style={{ color: '#666', marginBottom: '2rem' }}>
                        We're sorry for the inconvenience. Please refresh the page or try again later.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            padding: '12px 24px',
                            background: '#1d2342',
                            color: '#f4efe3',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            fontFamily: "'Inter', sans-serif",
                            transition: 'transform 0.2s ease'
                        }}
                        onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                    >
                        Refresh Page
                    </button>
                    {process.env.NODE_ENV === 'development' && this.state.error && (
                        <details style={{ marginTop: '2rem', textAlign: 'left', maxWidth: '800px', margin: '2rem auto' }}>
                            <summary style={{ cursor: 'pointer', color: '#1d2342', fontWeight: 'bold' }}>
                                Error Details (Development Only)
                            </summary>
                            <pre style={{
                                background: '#f4f4f4',
                                padding: '1rem',
                                borderRadius: '4px',
                                overflow: 'auto',
                                margin: '1rem 0'
                            }}>
                                {this.state.error && this.state.error.toString()}
                                {this.state.errorInfo && this.state.errorInfo.componentStack}
                            </pre>
                        </details>
                    )}
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;