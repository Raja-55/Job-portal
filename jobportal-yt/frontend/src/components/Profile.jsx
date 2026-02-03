import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { 
    Mail, 
    Contact, 
    Pen, 
    Briefcase, 
    FileText,
    ExternalLink, 
} from 'lucide-react'
import { Badge } from './ui/badge'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    // Function to get initials for the fallback avatar
    const getInitials = (name) => {
        if (!name) return "U";
        return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
    }

    return (
        <div className='bg-gray-50 min-h-screen pb-10'>
            <div className='max-w-4xl mx-auto pt-10 px-4'>
                
                {/* Main Profile Card */}
                <div className='bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden'>
                    {/* Header/Banner Area */}
                    <div className='h-24 bg-gradient-to-r from-indigo-600 to-purple-600'></div>
                    
                    <div className='px-8 pb-8'>
                        <div className='flex justify-between items-start -mt-12'>
                            <div className='flex items-end gap-5'>
                                <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                                    <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                                    <AvatarFallback className="bg-indigo-100 text-indigo-700 text-2xl font-bold">
                                        {getInitials(user?.fullname)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className='pb-2'>
                                    <h1 className='font-bold text-2xl text-gray-900'>{user?.fullname}</h1>
                                    <p className='text-gray-500 font-medium flex items-center gap-1'>
                                        <Briefcase size={16} /> {user?.role === 'student' ? 'Candidate' : 'Recruiter'}
                                    </p>
                                </div>
                            </div>
                            <Button 
                                onClick={() => setOpen(true)} 
                                variant="outline" 
                                className="mt-14 rounded-full border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 transition-all gap-2"
                            >
                                <Pen size={16} /> Edit Profile
                            </Button>
                        </div>

                        {/* Bio Section */}
                        <div className='mt-8'>
                            <h2 className='text-sm font-bold uppercase tracking-wider text-gray-400 mb-2'>About</h2>
                            <p className='text-gray-700 leading-relaxed'>
                                {user?.profile?.bio || "No bio added yet. Tell recruiters about yourself!"}
                            </p>
                        </div>

                        {/* Contact Information Grid */}
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 py-8 border-y border-gray-100'>
                            <div className='flex items-center gap-4 group'>
                                <div className='p-3 bg-gray-50 rounded-2xl group-hover:bg-indigo-50 transition-colors'>
                                    <Mail className='text-gray-500 group-hover:text-indigo-600' size={20} />
                                </div>
                                <div>
                                    <p className='text-xs font-bold text-gray-400 uppercase'>Email Address</p>
                                    <span className='text-gray-700 font-medium'>{user?.email}</span>
                                </div>
                            </div>
                            <div className='flex items-center gap-4 group'>
                                <div className='p-3 bg-gray-50 rounded-2xl group-hover:bg-indigo-50 transition-colors'>
                                    <Contact className='text-gray-500 group-hover:text-indigo-600' size={20} />
                                </div>
                                <div>
                                    <p className='text-xs font-bold text-gray-400 uppercase'>Phone Number</p>
                                    <span className='text-gray-700 font-medium'>{user?.phoneNumber || "Not provided"}</span>
                                </div>
                            </div>
                        </div>

                        {/* Skills Section */}
                        <div className='mt-8'>
                            <h2 className='text-sm font-bold uppercase tracking-wider text-gray-400 mb-4'>Technical Skills</h2>
                            <div className='flex flex-wrap gap-2'>
                                {
                                    user?.profile?.skills.length !== 0 ? (
                                        user?.profile?.skills.map((item, index) => (
                                            <Badge 
                                                key={index} 
                                                className="bg-indigo-50 text-indigo-700 border-indigo-100 px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-indigo-100 transition-colors"
                                            >
                                                {item}
                                            </Badge>
                                        ))
                                    ) : <span className='text-gray-400 italic'>No skills listed</span>
                                }
                            </div>
                        </div>

                        {/* Resume Section */}
                        <div className='mt-8'>
                            <h2 className='text-sm font-bold uppercase tracking-wider text-gray-400 mb-4'>Resume</h2>
                            {
                                user?.profile?.resume ? (
                                    <a 
                                        target='_blank' 
                                        rel="noopener noreferrer"
                                        href={user?.profile?.resume} 
                                        className='flex items-center justify-between p-4 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50 hover:border-indigo-400 hover:bg-indigo-50 group transition-all'
                                    >
                                        <div className='flex items-center gap-3'>
                                            <div className='p-2 bg-white rounded-lg shadow-sm group-hover:text-indigo-600'>
                                                <FileText size={24} />
                                            </div>
                                            <div>
                                                <p className='text-sm font-bold text-gray-900 truncate max-w-[200px]'>
                                                    {user?.profile?.resumeOriginalName || "View Resume"}
                                                </p>
                                                <p className='text-xs text-gray-500'>PDF Document</p>
                                            </div>
                                        </div>
                                        <div className='flex items-center gap-2 text-indigo-600 font-semibold text-sm'>
                                            <span>View File</span>
                                            <ExternalLink size={16} />
                                        </div>
                                    </a>
                                ) : <span className='text-gray-400 italic'>No resume uploaded</span>
                            }
                        </div>
                    </div>
                </div>

                {/* Applied Jobs Section */}
                <div className='mt-10'>
                    <div className='flex items-center gap-2 mb-5'>
                        <h1 className='font-bold text-2xl text-gray-900'>Application History</h1>
                        <Badge variant="outline" className="rounded-full">{user?.applications?.length || 0}</Badge>
                    </div>
                    <div className='bg-white border border-gray-200 rounded-3xl p-6 shadow-sm'>
                        <AppliedJobTable />
                    </div>
                </div>
            </div>

            {/* Profile Update Dialog Component */}
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile