import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "../ui/ScrollToTop";
import ScrollToTopOnRouteChange from "../ScrollToTopOnRouteChange";

export default function Layout() {
  return (
    <>
      <ScrollToTopOnRouteChange />
      <Header />
      <Outlet />
      <Footer />
      <ScrollToTop />
    </>
  );
}
