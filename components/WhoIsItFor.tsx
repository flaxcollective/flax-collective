import { Eye, ShieldCheck, CheckCircle } from 'lucide-react';

export default function WhoIsItFor() {
  const listItems = [
    {
      label: "You want?",
      text: "A solid foundation upon which to build your brand vision"
    },
    {
      label: "You need?",
      text: "Targeted strategies focused on achieving business stability"
    },
    {
      label: "Budget?",
      text: "Cost-effective solutions that don't compromise on quality"
    },
    {
      label: "Growth?",
      text: "Sustainable scaling capabilities for future endeavors"
    }
  ];

  return (
    <section className="py-24 bg-[var(--color-background-beige)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6 tracking-wide">
            For Whom We Provide Value
          </h2>
          <p className="text-gray-600 max-w-4xl mx-auto leading-relaxed text-lg">
            We combine deep industry knowledge with innovative thinking to deliver tangible results.<br className="hidden md:block" />
            Whether you are an established brand looking to optimize or a new venture seeking guidance.
          </p>
        </div>

        <div className="bg-white rounded-[2rem] p-8 md:p-14 shadow-sm border border-gray-100 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 mb-16 relative">
            {/* You Are */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 text-gray-800">
                 <Eye className="w-12 h-12" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold mb-4">You are</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                You are a dynamic and passionate individual or brand with solid business models that are destined for regional, national or international expansion.
              </p>
            </div>
            
            {/* Divider visible only on md+ */}
            <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-px bg-gray-200 transform -translate-x-1/2"></div>

            {/* We Are */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 text-gray-800">
                 <ShieldCheck className="w-12 h-12" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold mb-4">We are</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                We are highly passionate, seasoned professionals from around the world across all facets of the hospitality and education sectors. We provide a tailored, 'hands-on' approach.
              </p>
            </div>
          </div>

          <div className="pt-16 border-t border-gray-100">
            <ul className="max-w-4xl mx-auto space-y-6">
              {listItems.map((item, idx) => (
                <li key={idx} className="flex flex-col md:grid md:grid-cols-[1fr_auto_1fr] md:gap-12 items-start md:items-center">
                  <div className="font-bold text-gray-900 text-lg md:text-right mb-1 md:mb-0 w-full">
                    {item.label}
                  </div>
                  <div className="hidden md:flex justify-center items-center">
                    <CheckCircle className="w-6 h-6 text-black" strokeWidth={1.5} />
                  </div>
                  <div className="flex items-start gap-3 w-full">
                    <CheckCircle className="w-6 h-6 text-black md:hidden mt-0.5 shrink-0" strokeWidth={1.5} />
                    <span className="text-gray-600 text-lg">{item.text}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
