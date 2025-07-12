import { useNavigate } from "react-router-dom";

const PromoBanner = ({
  title,
  subtitle,
  buttonText,
  image,
  size = "large",
}) => {
  const navigate = useNavigate();
  const sizeClasses = size === "large" ? "h-40" : "h-32";

  return (
    <div
      className={`${sizeClasses} rounded-xl p-6 flex items-center justify-between overflow-hidden relative`}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          loading="lazy"
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1 z-10">
        <h3 className="text-white text-xl font-bold mb-2">{title}</h3>
        {subtitle && <p className="text-white/90 text-sm mb-4">{subtitle}</p>}
        {buttonText && (
          <button
            onClick={() => {
              window.scrollTo(0, 0);
              navigate("/shop");
            }}
            className="bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors cursor-pointer"
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default PromoBanner;
