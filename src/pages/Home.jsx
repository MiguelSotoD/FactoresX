import React from 'react';

function Home() {
    return (
        <div className="home container mx-auto p-4 bg-gray-100">
            <header className="text-center my-8">
                <h1 className="text-5xl font-extrabold text-blue-400">Bienvenido a FactoresX</h1>
                <p className="text-lg mt-4 text-gray-700">
                    Nuestra aplicación te permite evaluar los factores de riesgo psicosocial en tu organización de manera fácil y rápida.
                </p>
            </header>
            
            <section className="text-center my-8">
                <img src="https://tesisymasters.com.co/wp-content/uploads/2023/12/TYM-COL-nueva-portada-3-1024x576.png" alt="Publicidad" className="mx-auto mb-4 rounded-lg shadow-lg" />
                <p className="text-lg text-gray-700">
                    Utiliza nuestros cuestionarios basados en la NOM-035 para identificar y analizar los riesgos psicosociales en tu lugar de trabajo.
                </p>
            </section>
            
            <section className="my-8">
                <h2 className="text-3xl font-semibold text-center mb-4 text-blue-500">¿Por qué elegir FactoresX?</h2>
                <div className="flex flex-wrap justify-center">
                    <div className="w-full md:w-1/3 p-4">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZqcaJ91wRenLMF9umFzzAXy9yCYrBuY0hew&s" alt="Facilidad de uso" className="mx-auto mb-2 rounded-lg shadow-md w-48 h-48" />
                        <h3 className="text-xl font-semibold text-center text-blue-400">Facilidad de uso</h3>
                        <p className="text-center text-gray-700">
                            Nuestra plataforma es intuitiva y fácil de usar, permitiendo una evaluación rápida y eficiente.
                        </p>
                    </div>
                    <div className="w-full md:w-1/3 p-4">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzEdOw8kzs8etOHBMUjYq83BDVNQPIqcVFcA&s" alt="Resultados precisos" className="mx-auto mb-2 rounded-lg shadow-md w-56 h-56" />
                        <h3 className="text-xl font-semibold text-center text-blue-400">Resultados precisos</h3>
                        <p className="text-center text-gray-700">
                            Obtén resultados precisos y detallados para tomar decisiones informadas en tu organización.
                        </p>
                    </div>
                    <div className="w-full md:w-1/3 p-4">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBBxrYFBm8g4xFzNfoFCoJAHVKT0ai8a_cvA&s" alt="Soporte continuo" className="mx-auto mb-2 rounded-lg shadow-md w-48 h-48" />
                        <h3 className="text-xl font-semibold text-center text-blue-400">Soporte continuo</h3>
                        <p className="text-center text-gray-700">
                            Contamos con un equipo de soporte disponible para ayudarte en cualquier momento.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
