// Importación de imágenes
import caraFeliz from '../assets/cara-feliz.png';
import caraNeutra from '../assets/cara-neutra.png';
import caraTriste from '../assets/cara-triste.png';

export default function Resultado() {
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = '/path/to/your/file.pdf'; // Replace with the actual path to your PDF file
        link.download = 'Resultado_FactoresX.pdf';
        link.click();
    };

    const getRiskClassification = (riskLevel) => {
        switch (riskLevel) {
            case 'BAJO':
                return { color: 'bg-green-400', icon: 'fas fa-smile', textColor: 'text-black' };
            case 'MEDIO':
                return { color: 'bg-yellow-400', icon: 'fas fa-meh', textColor: 'text-black' };
            case 'ALTO':
                return { color: 'bg-red-400', icon: 'fas fa-frown', textColor: 'text-white' };
            default:
                return { color: 'bg-gray-400', icon: 'fas fa-question', textColor: 'text-black' };
        }
    };

    const riskLevel = 'BAJO'; // Replace this with the actual risk level from the backend
    const { color, icon, textColor } = getRiskClassification(riskLevel);

    const getImageForRiskLevel = (riskLevel) => {
        switch (riskLevel) {
            case 'BAJO':
                return caraFeliz;
            case 'MEDIO':
                return caraNeutra;
            case 'ALTO':
                return caraTriste;
            default:
                return caraNeutra;
        }
    };

    const riskImage = getImageForRiskLevel(riskLevel);

    return (
        <div className="max-w-4xl mx-auto p-5 my-19">
            <div className="flex justify-between items-start w-full">
                <div className="text-left max-w-md flex flex-col items-center">
                    <h1 className="text-2xl font-semibold mb-4">Clasificación de Riesgo</h1>
                    <div className={`flex flex-col items-center justify-center w-36 h-36 ${color} rounded-2xl`}>
                        <img src={riskImage} alt="Risk Level" className="w-20 h-20" draggable="false" />
                        <i className={`${icon} text-5xl ${textColor}`}></i>
                        <p className={`mt-2 text-lg font-bold ${textColor}`}>{riskLevel}</p>
                    </div>
                </div>
                <div className="text-left max-w-md">
                    <h2 className="text-2xl font-semibold mb-4">Recomendaciones</h2>
                    <p className="text-justify">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam
                        placeat, delectus quos earum cumque explicabo quaerat dolorum
                        assumenda, natus magnam repellat dolore porro ratione laboriosam et
                        sed soluta corporis nostrum. Lorem ipsum dolor sit amet consectetur
                        adipisicing elit.
                    </p>
                </div>
            </div>
            <div className="text-center mt-10 max-w-lg mx-auto font-medium">
                <p>
                    Para información más detallada y consulta de respuestas, descarga el PDF clickeando el botón de abajo.
                </p>
            </div>
            <div className="text-center">
                <div className="mt-5">
                    <button
                        className="px-3 py-1 border border-black rounded-md bg-white hover:bg-red-400 cursor-pointer hover:text-white hover:border-white"
                        onClick={handleDownload}
                    >
                        Descargar PDF
                    </button>
                </div>
            </div>
        </div>
    );
}