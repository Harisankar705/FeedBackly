import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <Card>
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-2xl font-semibold text-gray-900">About SurveyMERN</h2>
          <p className="mt-1 max-w-2xl text-sm text-[#7D99AA]">Learn more about our survey application.</p>
        </div>
        <CardContent className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <div className="prose max-w-none">
            <p>SurveyMERN is a comprehensive survey management application built with the MERN stack (MongoDB, Express, React, Node.js). Our platform allows organizations to collect, manage, and analyze survey data efficiently.</p>
            
            <h3 className="text-xl font-medium mt-6 mb-3">Key Features</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li className="text-[#7D99AA]">User-friendly survey submission form</li>
              <li className="text-[#7D99AA]">Secure data storage in MongoDB</li>
              <li className="text-[#7D99AA]">Admin dashboard for data visualization</li>
              <li className="text-[#7D99AA]">Export functionality for data analysis</li>
              <li className="text-[#7D99AA]">Form validation and anti-spam measures</li>
            </ul>
            
            <h3 className="text-xl font-medium mt-6 mb-3">Our Technology Stack</h3>
            <p>We've built SurveyMERN using modern web technologies:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li className="text-[#7D99AA]"><strong>MongoDB</strong> - For flexible, scalable data storage</li>
              <li className="text-[#7D99AA]"><strong>Express.js</strong> - Fast, unopinionated web framework for Node.js</li>
              <li className="text-[#7D99AA]"><strong>React</strong> - Frontend library for building user interfaces</li>
              <li className="text-[#7D99AA]"><strong>Node.js</strong> - JavaScript runtime for building server-side applications</li>
              <li className="text-[#7D99AA]"><strong>TypeScript</strong> - For type safety and better developer experience</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;
