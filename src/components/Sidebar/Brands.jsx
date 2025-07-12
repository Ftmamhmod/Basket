import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Brands = ({ uniqueBrands, selectedBrands, toggleParam, brandCounts }) => {
  return (
    <Accordion type="single" collapsible className="w-full ">
      <AccordionItem value="brands">
        <AccordionTrigger className="text-[#202435] font-semibold text-[15px] uppercase dosis pb-4 cursor-pointer">
          Brands
        </AccordionTrigger>
        <AccordionContent>
          <ul>
            {uniqueBrands.map((brand, index) => {
              const inputId = `brand-${index}`;
              return (
                <li className="py-2 px-2" key={index}>
                  <div className="relative flex items-center justify-between">
                    <input
                      type="checkbox"
                      id={inputId}
                      className="peer hidden"
                      checked={selectedBrands.includes(brand)}
                      onChange={(e) =>
                        toggleParam("brand", brand, e.target.checked)
                      }
                    />
                    <label
                      htmlFor={inputId}
                      className="pl-6 text-[15px] cursor-pointer text-[#71778E]"
                    >
                      {brand}
                    </label>
                    <span className="absolute w-4 h-4 left-0 top-1/2 -translate-y-1/2 bg-[#f2f3f4] border border-[#71778ec5] peer-checked:bg-[#35AFA0] pointer-events-none"></span>
                    <span className="text-[#71778E] text-[14px]">
                      ({brandCounts[brand] || 0})
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default Brands;
