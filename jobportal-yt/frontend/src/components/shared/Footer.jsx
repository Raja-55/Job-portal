
const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t mt-12">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold">JobPortal</h3>
            <p className="mt-2 text-sm text-gray-600">Helping jobseekers find meaningful work — resume tips, interview prep, and personalised job matches.</p>
            <p className="mt-4 text-sm text-gray-500">© {new Date().getFullYear()} JobPortal. All rights reserved.</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Quick Links</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li><a href="/jobs" className="hover:text-gray-800">Search Jobs</a></li>
              <li><a href="/browse" className="hover:text-gray-800">Browse Categories</a></li>
              <li><a href="/companies" className="hover:text-gray-800">Companies</a></li>
              <li><a href="/profile" className="hover:text-gray-800">My Profile</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">For Jobseekers</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>Resume tips & templates</li>
              <li>Interview preparation</li>
              <li>Salary & market insights</li>
              <li>Career advice</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Contact & Newsletter</h4>
            <p className="text-sm text-gray-600">support@jobportal.example</p>
            <div className="mt-3 flex">
              <input aria-label="Email" placeholder="Your email" className="w-full px-3 py-2 border rounded-l-md text-sm" />
              <button className="bg-[#6A38C2] text-white px-4 rounded-r-md">Subscribe</button>
            </div>
            <div className="flex gap-3 mt-4">
              <a href="#" aria-label="facebook" className="text-gray-600 hover:text-gray-800">Facebook</a>
              <a href="#" aria-label="twitter" className="text-gray-600 hover:text-gray-800">Twitter</a>
              <a href="#" aria-label="linkedin" className="text-gray-600 hover:text-gray-800">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;