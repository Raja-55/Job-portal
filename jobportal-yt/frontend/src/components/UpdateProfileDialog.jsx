import { useState } from 'react'
import PropTypes from 'prop-types'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2, User, Mail, Phone, PenTool, FileText, BadgeCheck } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(', ') || "", // Joined for easier editing
        file: user?.profile?.resume || ""
    });
    
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
                setOpen(false); // Close only on success
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Update failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden border-none shadow-2xl" onInteractOutside={() => setOpen(false)}>
                <DialogHeader className="bg-indigo-600 p-6 text-white">
                    <DialogTitle className="text-xl font-bold flex items-center gap-2">
                        <PenTool className="h-5 w-5" />
                        Update Profile
                    </DialogTitle>
                    <p className="text-indigo-100 text-sm">Keep your professional details up to date.</p>
                </DialogHeader>

                <form onSubmit={submitHandler} className="p-6">
                    <div className='space-y-4'>
                        {/* Name Field */}
                        <div className='space-y-1.5'>
                            <Label htmlFor="fullname" className="text-sm font-semibold flex items-center gap-2">
                                <User className="h-4 w-4 text-gray-500" /> Full Name
                            </Label>
                            <Input
                                id="fullname"
                                name="fullname"
                                type="text"
                                value={input.fullname}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-indigo-600"
                            />
                        </div>

                        {/* Email Field */}
                        <div className='space-y-1.5'>
                            <Label htmlFor="email" className="text-sm font-semibold flex items-center gap-2">
                                <Mail className="h-4 w-4 text-gray-500" /> Email Address
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={input.email}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-indigo-600"
                            />
                        </div>

                        {/* Phone & Skills Grid */}
                        <div className='grid grid-cols-2 gap-4'>
                            <div className='space-y-1.5'>
                                <Label htmlFor="phoneNumber" className="text-sm font-semibold flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-gray-500" /> Phone
                                </Label>
                                <Input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={input.phoneNumber}
                                    onChange={changeEventHandler}
                                    className="focus-visible:ring-indigo-600"
                                />
                            </div>
                            <div className='space-y-1.5'>
                                <Label htmlFor="skills" className="text-sm font-semibold flex items-center gap-2">
                                    <BadgeCheck className="h-4 w-4 text-gray-500" /> Skills
                                </Label>
                                <Input
                                    id="skills"
                                    name="skills"
                                    placeholder="React, Node, CSS"
                                    value={input.skills}
                                    onChange={changeEventHandler}
                                    className="focus-visible:ring-indigo-600"
                                />
                            </div>
                        </div>

                        {/* Bio Field */}
                        <div className='space-y-1.5'>
                            <Label htmlFor="bio" className="text-sm font-semibold flex items-center gap-2">
                                <FileText className="h-4 w-4 text-gray-500" /> Short Bio
                            </Label>
                            <Input
                                id="bio"
                                name="bio"
                                value={input.bio}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-indigo-600"
                            />
                        </div>

                        {/* Resume Upload */}
                        <div className='space-y-1.5'>
                            <Label htmlFor="file" className="text-sm font-semibold">Resume (PDF)</Label>
                            <div className="flex items-center w-full">
                                <Input
                                    id="file"
                                    name="file"
                                    type="file"
                                    accept="application/pdf"
                                    onChange={fileChangeHandler}
                                    className="cursor-pointer file:bg-indigo-50 file:text-indigo-700 file:border-0 file:rounded-md file:px-2 file:py-1 file:mr-4 file:font-medium hover:file:bg-indigo-100 transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="mt-8">
                        {loading ? (
                            <Button disabled className="w-full bg-indigo-600">
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> 
                                Updating...
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all">
                                Save Changes
                            </Button>
                        )}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

UpdateProfileDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
};

export default UpdateProfileDialog