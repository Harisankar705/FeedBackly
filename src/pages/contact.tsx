import { Card, CardContent } from "@/components/ui/card";
import { Twitter, Linkedin, Github } from "lucide-react";

const Contact = () => {
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <Card>
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-2xl font-semibold text-gray-900">Contact Us</h2>
          <p className="mt-1 max-w-2xl text-sm text-[#7D99AA]">Get in touch with our team.</p>
        </div>
        <CardContent className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">Email</dt>
              <dd className="mt-1 text-sm text-[#7D99AA] sm:mt-0 sm:col-span-2">support@surveymern.com</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">Phone</dt>
              <dd className="mt-1 text-sm text-[#7D99AA] sm:mt-0 sm:col-span-2">+1 (555) 123-4567</dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">Address</dt>
              <dd className="mt-1 text-sm text-[#7D99AA] sm:mt-0 sm:col-span-2">
                123 Survey Street<br />
                App Suite 400<br />
                San Francisco, CA 94107
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">Social Media</dt>
              <dd className="mt-1 text-sm text-[#7D99AA] sm:mt-0 sm:col-span-2">
                <div className="flex space-x-4">
                  <a href="#" className="text-[#7D99AA] hover:text-[#66C4FF]">
                    <Twitter className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-[#7D99AA] hover:text-[#66C4FF]">
                    <Linkedin className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-[#7D99AA] hover:text-[#66C4FF]">
                    <Github className="h-6 w-6" />
                  </a>
                </div>
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </div>
  );
};

export default Contact;
