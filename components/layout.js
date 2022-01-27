import Header from "../components/header";
import Footer from "../components/footer";
export default function Layout({ children }) {
  return (
    <div className="flex flex-col w-screen min-h-screen justify-center content-center items-center bg-purple-100">
      <Header />
      <div className="grow flex flex-row w-4/5 max-w-screen-xl justify-center">
        {children}
      </div>
      <Footer />
    </div>
  );
}
