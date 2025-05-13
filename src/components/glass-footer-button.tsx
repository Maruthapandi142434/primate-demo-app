import GlassIcons from "./ui/footer-button";
// import { FiFileText, FiBook, FiHeart, FiCloud, FiEdit, FiBarChart2 } from "react-icons/fi";

// update with your own icons and colors
const items = [
  { icon: <h1>t</h1>, color: 'blue', label: 'Files' },
  { icon: <h1>t</h1>, color: 'purple', label: 'Books' },
  { icon: <h1>t</h1>, color: 'red', label: 'Health' },
  { icon: <h1>t</h1>, color: 'indigo', label: 'Weather' },
  { icon: <h1>t</h1>, color: 'orange', label: 'Notes' },
  { icon: <h1>t</h1>, color: 'green', label: 'Stats' },
];

<div style={{ height: '600px', position: 'relative' }}>
  <GlassIcons items={items} className="custom-class"/>
</div>