import Footer from "../components/Footer";
import Header from "../components/Header";

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container mx-auto flex-1 py-10">{children}</div>
      <Footer />
    </div>
  );
};

type Props = {
  children: React.ReactNode;
};

export default Layout;
