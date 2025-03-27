const Login = () => {
    return(
        <div className="flex justify-center items-center min-h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg shadow-gray-400 w-4/5 max-w-md">
                <div className="flex justify-center mb-6 gap-x-6">
                    <h2 className="text-3xl font-bold">Iniciar Sesión</h2>
                </div>
                
                <form>
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-sm font-semibold mb-2">Correo Electrónico</label>
                        <input type="email" id="email" name="email"   className="p-2 border border-gray-300 rounded-lg w-full " />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password" className="block text-sm font-semibold mb-2">Contraseña</label>
                        <input type="password" id="password" name="password"  className="p-2 border border-gray-300 rounded-lg w-full " />
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" className="bg-gray-400 text-white p-1.5 rounded-lg w-1/2 hover:bg-blue-500 transition duration-300 cursor-pointer">Iniciar Sesión</button>
                    </div>
                </form>
                <div className="flex justify-center mt-4">
                    <a href="/recuperar-contraseña" className="text-sm text-blue-500 hover:underline">¿Olvidaste tu contraseña?</a>
                </div>
            </div>
        </div>
    )
}

export default Login