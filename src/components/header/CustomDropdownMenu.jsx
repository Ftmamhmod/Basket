import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { logOut } from "@/store/authSlice/authSlice";

export default function CustomDropdownMenu({
  trigger,
  items = [],
  withDivider = false,
  align = "start",
}) {
  const dispatch = useDispatch();
  const handelLogOut = () => {
    if (items[0].label === "Log out") {
      console.log("Log out");
      dispatch(logOut());
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="border rounded-full p-3 border-[#E2E4EC] "
      >
        {trigger}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-56 bg-white text-black text-sm rounded-md shadow-md z-[100]"
        align={align}
      >
        {items.map((item, index) => (
          <DropdownMenuItem asChild key={index}>
            <Link
              onClick={handelLogOut}
              to={item.to}
              className={cn(
                "flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer",
                withDivider &&
                  index < items.length - 1 &&
                  "border-b border-gray-200"
              )}
            >
              {item.icon && <span className="text-[#35AFA0]">{item.icon}</span>}
              <span>{item.label}</span>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
