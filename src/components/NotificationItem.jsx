import { MenuItem } from "@szhsin/react-menu";
import { Link } from "react-router-dom";

const NotificationItem = ({ title, description, date }) => {
    return (
        <MenuItem className="p-0 hover:bg-transparent">
            <Link
                to="/"
                className="text-gray-300 flex flex-1 items-center gap-4 py-2 px-4 hover:bg-secondary-900 transition-colors rounded-lg"
            >
                <img
                    src="https://img.freepik.com/foto-gratis/feliz-optimista-guapo-gerente-ventas-latina-apuntando-lado-mirando-camara_1262-12679.jpg"
                    className="w-8 h-8 object-cover rounded-full"
                />
                <div className="text-sm flex flex-col">
                    <div className="flex items-center justify-between gap-4">
                        <span>{title}</span>{" "}
                        <span className="text-[8px]">{date}</span>
                    </div>
                    <p className="text-gray-500 text-xs">
                        {description}
                    </p>
                </div>
            </Link>
        </MenuItem>
    )
}

export default NotificationItem;