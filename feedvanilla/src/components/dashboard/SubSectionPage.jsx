const SubSectionPage = ({ title }) => (
  <div className="p-4 bg-white min-w-screen">
    <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
    <p className="text-gray-600">Content for {title} goes here.</p>
  </div>
);

export default SubSectionPage;
