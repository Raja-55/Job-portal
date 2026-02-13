import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { LogOut, User2, BriefcaseBusiness, Search} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                // Clear token from localStorage and redux
                localStorage.removeItem('token');
                delete axios.defaults.headers.common["Authorization"];
                
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Logout failed");
        }
    }

    // Function to get initials for default avatar
    const getInitials = (name) => {
        if (!name) return "U";
        return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
    }

    return (
        <header className='sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60'>
            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                <div className='flex h-16 items-center justify-between gap-4'>
                    
                    {/* Logo & Desktop Nav */}
                    <div className='flex items-center gap-8'>
                        <Link to="/" className='flex items-center gap-2 group'>
                            <div className='bg-indigo-600 p-1.5 rounded-lg group-hover:bg-indigo-700 transition-colors'>
                                <BriefcaseBusiness className='h-6 w-6 text-white' />
                            </div>
                            <h1 className='text-xl font-bold tracking-tight text-gray-900'>
                                Career<span className='text-indigo-600'>Path</span>
                            </h1>
                        </Link>

                        <nav className='hidden md:flex items-center gap-6 text-sm font-medium text-gray-600'>
                            {user && user.role === 'recruiter' ? (
                                <>
                                    <Link to="/admin/companies" className='hover:text-indigo-600 transition-colors'>Companies</Link>
                                    <Link to="/admin/jobs" className='hover:text-indigo-600 transition-colors'>Jobs</Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/" className='hover:text-indigo-600 transition-colors'>Home</Link>
                                    <Link to="/jobs" className='hover:text-indigo-600 transition-colors'>Jobs</Link>
                                    <Link to="/browse" className='hover:text-indigo-600 transition-colors'>Browse</Link>
                                </>
                            )}
                        </nav>
                    </div>

                    {/* Search Bar - Hidden on small mobile */}
                    <div className='hidden sm:flex flex-1 max-w-md items-center relative'>
                        <div className='absolute left-3 text-gray-400'>
                            <Search size={16} />
                        </div>
                        <input 
                            aria-label='Search jobs' 
                            placeholder='Search jobs or skills...' 
                            className='w-full bg-gray-100 border-none focus:ring-2 focus:ring-indigo-500 rounded-full py-2 pl-10 pr-4 text-sm transition-all'
                        />
                    </div>

                    {/* Right Side: Auth / Profile */}
                    <div className='flex items-center gap-3'>
                        {
                            !user ? (
                                <div className='flex items-center gap-3'>
                                    <Link to="/login">
                                        <Button variant="ghost" className="text-gray-600">Login</Button>
                                    </Link>
                                    <Link to="/signup">
                                        <Button className="bg-indigo-600 hover:bg-indigo-700 shadow-md transition-all">
                                            Sign Up
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Avatar className="h-10 w-10 cursor-pointer border-2 border-transparent hover:border-indigo-500 transition-all">
                                            <AvatarImage src={user?.profile?.profilePhoto} />
                                            <AvatarFallback className="bg-indigo-100 text-indigo-700 font-semibold">
                                                {getInitials(user?.fullname)}
                                            </AvatarFallback>
                                        </Avatar>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-72 mt-2 mr-4 p-4 rounded-xl shadow-xl" align="end">
                                        <div className='space-y-4'>
                                            <div className='flex items-center gap-3 pb-3 border-b'>
                                                <Avatar className="h-12 w-12">
                                                    <AvatarImage src={user?.profile?.profilePhoto} />
                                                    <AvatarFallback className="bg-indigo-100 text-indigo-700 font-bold">
                                                        {getInitials(user?.fullname)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className='overflow-hidden'>
                                                    <h4 className='font-semibold text-gray-900 truncate'>{user?.fullname}</h4>
                                                    <p className='text-xs text-gray-500 truncate'>{user?.email}</p>
                                                </div>
                                            </div>
                                            
                                            <div className='flex flex-col gap-1'>
                                                {user && user.role === 'student' && (
                                                    <Link to="/profile">
                                                        <Button variant="ghost" className='w-full justify-start gap-3 font-normal text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'>
                                                            <User2 className='h-4 w-4' />
                                                            View Profile
                                                        </Button>
                                                    </Link>
                                                )}
                                                
                                                <Button 
                                                    onClick={logoutHandler} 
                                                    variant="ghost" 
                                                    className='w-full justify-start gap-3 font-normal text-red-600 hover:text-red-700 hover:bg-red-50'
                                                >
                                                    <LogOut className='h-4 w-4' />
                                                    Logout
                                                </Button>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            )
                        }
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar