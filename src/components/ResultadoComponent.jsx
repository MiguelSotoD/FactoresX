export default function Resultado() {
    return (
        <div className="max-w-4xl mx-auto p-5 my-19">
            <div className="flex justify-between items-start w-full">
                <div className="text-left max-w-md flex flex-col items-center">
                    <h1 className="text-2xl font-semibold mb-4">Clasificación de Riesgo</h1>
                    <div className="flex flex-col items-center justify-center w-36 h-36 bg-green-400 rounded-2xl">
                        <i className="fas fa-smile text-5xl text-black"></i>
                        <p className="mt-2 text-lg font-bold">BAJO</p>
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
                    <button className="px-3 py-1 border border-black rounded-md bg-white hover:bg-red-400 cursor-pointer hover:text-white hover:border-white">
                        Descargar PDF
                    </button>
                </div>
            </div>
        </div>
    );
}