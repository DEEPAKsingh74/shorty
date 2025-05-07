import Navbar from "./components/ui/navbar/Navbar";
import UrlShortener from "./components/ui/shortner_section/UrlShortener";

export default function Home() {
  return (
    <div>
      
    {/* navbar  */}
    <Navbar/>

    {/* main url shortner content  */}
    <UrlShortener/>

    </div>
  );
}
