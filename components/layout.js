import Header from "../components/header";
import Footer from "../components/footer";
export default function Layout({ children }) {
  return (
    <div className="flex flex-col w-screen min-h-screen justify-center content-center">
      <Header />
      <main className="grow">{children}</main>
      <Footer />
    </div>
  );
}
