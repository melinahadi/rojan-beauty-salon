import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("خطای غیرمنتظره در برنامه:", error, info);
  }

  handleRetry = () => {
    this.setState({ hasError: false });
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="min-h-screen flex items-center justify-center px-8 bg-cream text-center"
          style={{ fontFamily: "Vazirmatn, system-ui, sans-serif" }}
          dir="rtl"
        >
          <div className="max-w-sm">
            <div className="w-16 h-16 rounded-full bg-rose-deep/10 text-rose-deep flex items-center justify-center mx-auto mb-6 text-2xl">
              !
            </div>
            <h1 className="font-display text-2xl mb-3">یه مشکلی پیش اومد</h1>
            <p className="text-charcoal-2 text-sm mb-8">
              متأسفانه صفحه با یه خطای غیرمنتظره مواجه شد. لطفاً دوباره تلاش کن،
              یا کمی بعد برگرد.
            </p>
            <button
              onClick={this.handleRetry}
              className="bg-charcoal text-cream px-8 py-3 text-sm hover:bg-rose-deep transition-colors"
            >
              بازگشت به صفحه اصلی
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
