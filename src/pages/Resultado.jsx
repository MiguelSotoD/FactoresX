import Footer from "../components/Footer";
import Header from "../components/Header";
import Resultado from "../components/ResultadoComponent";

function ResultadoPages() {
    return (
        <>
            <Header />
            <h1 className="text-5xl font-extrabold text-blue-400 text-center">Tus Resultados estan listos!!</h1>
            <Resultado />
            <Footer />
        </>
    );
}
export default ResultadoPages;