import { Navigate } from 'react-router-dom';
import { supabase } from '../supabase/supabase';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginWithEmail } from '../components/auth/authen';

const Login = () => {
    const [backgroundImage, setBackgroundImage] = useState('');
    const [img2, setImg2] = useState('');
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          const user = await loginWithEmail(username, password);
          console.log('Logged in user:', user);
          // Navigate or fetch profile after login
          navigate("/");
        } catch (err) {
         console.log('error bruh')
        }
    };

    

    useEffect(() => {
        const fetchImages = async () => {
            try {
                // Start timing when fetching begins
                
                const startTime = Date.now();

                const [bgImg, img2] = await Promise.all([
                    supabase.storage.from('imgg').getPublicUrl('merged_3_column.jpg'),
                    supabase.storage.from('imgg').getPublicUrl('123.png')
                ]);

                setBackgroundImage(bgImg.data.publicUrl);
                setImg2(img2.data.publicUrl);

                // Calculate how long the loading has taken
                const loadingTime = Date.now() - startTime;
                // If loading took less than 2000ms, wait for the remaining time
                const remainingTime = Math.max(0, 500 - loadingTime);

                await new Promise(resolve => setTimeout(resolve, remainingTime));
            } catch (error) {
                console.error('Error fetching images:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchImages();
    }, []);

    return (
        <>
            {isLoading ? (
                <div className="fixed inset-0 flex items-center justify-center min-h-screen bg-black/50 backdrop-blur-sm">
                    <div className="flex flex-col items-center gap-4">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-900"></div>
                        <p className="font-medieval text-xl text-amber-100">Wandering...</p>
                    </div>
                </div>
            ) : (
                <div className="grid min-h-screen bg-cover bg-center w-full m-0 place-items-center bg-[url('/src/assets/merged_3_column.jpg')]">
                    <div className="text-center w-1/4 h-4/5  min-h-3/4 shadow-lg border backdrop-blur-sm rounded-lg pt-5 border-slate-50 ">
                        <div className="flex justify-center">
                            <img src={img2} alt="Logo" className="rounded-full" />
                        </div>
                        <div className="font-medieval text-4xl font-bold mt-2 mb-8 bg-gradient-to-r text-yellow-200 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] text-transparent bg-clip-text ">
                            Welcome to the Tavern
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col items-center mt-4">
                            <div className="w-full relative group flex justify-center">
                                <div className="relative w-3/4 mb-6">
                                    <input
                                        type="text"
                                        id="username"
                                        required
                                        className="font-medieval w-full h-10 px-4 text-sm peer bg-gray-100 outline-none rounded-lg"
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                    <label
                                        htmlFor="username"
                                        className="font-medieval transform transition-all absolute left-0 top-1/2 -translate-y-1/2 px-4 text-md  pointer-events-none peer-focus:-translate-y-10 peer-valid:-translate-y-10 peer-focus:text-sm peer-valid:text-sm"
                                    >
                                        What name do you go by, Traveler?
                                    </label>
                                </div>
                            </div>
                            <div className="w-full relative group flex justify-center">
                                <div className="relative w-3/4 mb-4">
                                    <input
                                        type="password"
                                        id="password"
                                        required
                                        className="font-medieval w-full h-10 px-4 text-sm peer bg-gray-100 outline-none rounded-lg"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <label
                                        htmlFor="username"
                                        className="font-medieval transform transition-all absolute left-0 top-1/2 -translate-y-1/2 px-4 text-md  pointer-events-none peer-focus:-translate-y-10 peer-valid:-translate-y-10 peer-focus:text-sm peer-valid:text-sm"
                                    >
                                        Say the magic words!
                                    </label>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="mb-4 bg-gradient-to-br from-amber-700 via-amber-800 to-amber-900 text-white rounded-lg p-2 w-3/4 
hover:from-amber-800 hover:to-amber-950 transition duration-300 ease-in-out font-medieval 
shadow-[inset_0_0_6px_#3b1d0f] border border-amber-950"
                            >
                                Enter the Tavern
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Login;